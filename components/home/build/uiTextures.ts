import * as THREE from "three";

/** pixels per 3D unit for the drawn UI */
export const PX = 512;

/** phone screen size (3D units) */
export const SCREEN = { w: 1.46, h: 3.16, z: 0.083 };

type Draw = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  font: string,
) => void;

function getFont() {
  return getComputedStyle(document.body).fontFamily || "system-ui, sans-serif";
}

export function makeTexture(wUnits: number, hUnits: number, draw: Draw) {
  const w = Math.round(wUnits * PX);
  const h = Math.round(hUnits * PX);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  draw(ctx, w, h, getFont());

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function rr(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function card(ctx: CanvasRenderingContext2D, w: number, h: number) {
  rr(ctx, 2, 2, w - 4, h - 4, 34);
  ctx.fillStyle = "#0d0e11";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.07)";
  ctx.lineWidth = 3;
  ctx.stroke();
}

/* ------------------------------------------------------------------ */
/* UI pieces that fly onto the phone screen                            */
/* ------------------------------------------------------------------ */

export type PieceDef = {
  id: string;
  w: number;
  h: number;
  /** y position on the screen (center) */
  y: number;
  /** where it flies in from (phone-local) */
  from: [number, number, number];
  /** starting rotation */
  rot: [number, number, number];
  draw: Draw;
};

export const PIECES: PieceDef[] = [
  {
    id: "header",
    w: 1.3,
    h: 0.2,
    y: 1.28,
    from: [-3.4, 2.6, 1.6],
    rot: [0.6, -0.8, 0.4],
    draw: (ctx, w, h, f) => {
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `500 28px ${f}`;
      ctx.fillText("Good morning,", 4, h * 0.28);
      ctx.fillStyle = "#ffffff";
      ctx.font = `600 40px ${f}`;
      ctx.fillText("Ada", 4, h * 0.72);

      const g = ctx.createLinearGradient(w - 92, 8, w - 8, h - 8);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(1, "#8e939c");
      ctx.beginPath();
      ctx.arc(w - 46, h / 2, 42, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.fillStyle = "#000";
      ctx.font = `700 34px ${f}`;
      ctx.textAlign = "center";
      ctx.fillText("A", w - 46, h / 2 + 2);
    },
  },
  {
    id: "balance",
    w: 1.3,
    h: 0.6,
    y: 0.83,
    from: [3.6, 1.6, 2.2],
    rot: [-0.4, 0.9, -0.3],
    draw: (ctx, w, h, f) => {
      rr(ctx, 0, 0, w, h, 38);
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "#3a74ff");
      g.addColorStop(1, "#0c36b0");
      ctx.fillStyle = g;
      ctx.fill();

      ctx.save();
      ctx.clip();
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.arc(w - 60, 40, 170, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w - 10, h, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.font = `500 26px ${f}`;
      ctx.fillText("Total balance", 36, 66);

      ctx.fillStyle = "#ffffff";
      ctx.font = `600 60px ${f}`;
      ctx.fillText("₦2,450,000.00", 36, 150);

      rr(ctx, 36, 200, 260, 56, 28);
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `500 22px ${f}`;
      ctx.fillText("+12.4% this month", 58, 236);
    },
  },
  {
    id: "actions",
    w: 1.3,
    h: 0.32,
    y: 0.31,
    from: [-3.8, 0.2, 2],
    rot: [0.3, -1, -0.5],
    draw: (ctx, w, h, f) => {
      const labels = ["Send", "Receive", "Bills", "Cards"];
      const glyphs = ["↗", "↙", "≡", "▭"];
      const gap = 16;
      const tw = (w - gap * 3) / 4;

      labels.forEach((label, i) => {
        const x = i * (tw + gap);
        rr(ctx, x + 1, 1, tw - 2, h - 2, 26);
        ctx.fillStyle = "#121317";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 2;
        ctx.stroke();

        const cx = x + tw / 2;
        ctx.beginPath();
        ctx.arc(cx, 58, 26, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font = `500 26px ${f}`;
        ctx.fillText(glyphs[i], cx, 59);

        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.font = `500 22px ${f}`;
        ctx.fillText(label, cx, 122);
      });
    },
  },
  {
    id: "chart",
    w: 1.3,
    h: 0.66,
    y: -0.24,
    from: [3.4, -1.4, 2.4],
    rot: [-0.5, 1.1, 0.3],
    draw: (ctx, w, h, f) => {
      card(ctx, w, h);

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `500 24px ${f}`;
      ctx.fillText("Spending", 32, 54);
      ctx.fillStyle = "#ffffff";
      ctx.font = `600 40px ${f}`;
      ctx.fillText("₦184,200", 32, 104);

      rr(ctx, w - 172, 30, 140, 44, 22);
      ctx.fillStyle = "rgba(255,255,255,0.07)";
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = `500 20px ${f}`;
      ctx.textAlign = "center";
      ctx.fillText("This week", w - 102, 59);
      ctx.textAlign = "left";

      const pts = [0.62, 0.42, 0.55, 0.28, 0.46, 0.18, 0.3];
      const x0 = 32;
      const x1 = w - 32;
      const y0 = 140;
      const y1 = h - 34;
      const xy = pts.map((p, i) => [
        x0 + (i / (pts.length - 1)) * (x1 - x0),
        y0 + p * (y1 - y0),
      ]);

      const line = () => {
        ctx.beginPath();
        ctx.moveTo(xy[0][0], xy[0][1]);
        for (let i = 1; i < xy.length; i++) {
          const [px, py] = xy[i - 1];
          const [cx, cy] = xy[i];
          const mx = (px + cx) / 2;
          ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
        }
      };

      line();
      ctx.lineTo(x1, y1);
      ctx.lineTo(x0, y1);
      ctx.closePath();
      const fill = ctx.createLinearGradient(0, y0, 0, y1);
      fill.addColorStop(0, "rgba(255,255,255,0.22)");
      fill.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = fill;
      ctx.fill();

      line();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 4;
      ctx.stroke();
    },
  },
  {
    id: "transactions",
    w: 1.3,
    h: 0.62,
    y: -0.94,
    from: [-3.2, -2.6, 1.8],
    rot: [0.7, -0.6, 0.6],
    draw: (ctx, w, h, f) => {
      card(ctx, w, h);

      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = `500 24px ${f}`;
      ctx.fillText("Recent", 32, 52);

      const rows = [
        ["N", "Netflix", "Subscription", "-₦4,500", "#ffffff"],
        ["S", "Salary", "Monthly", "+₦850,000", "#82a5ff"],
        ["T", "Transfer to Tobi", "Bank transfer", "-₦25,000", "#ffffff"],
      ];

      rows.forEach(([init, name, sub, amt, color], i) => {
        const y = 82 + i * 74;
        rr(ctx, 32, y, 56, 56, 16);
        ctx.fillStyle = "#1b1c21";
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = `600 24px ${f}`;
        ctx.textAlign = "center";
        ctx.fillText(init, 60, y + 37);
        ctx.textAlign = "left";

        ctx.fillStyle = "#ffffff";
        ctx.font = `500 25px ${f}`;
        ctx.fillText(name, 104, y + 24);
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.font = `400 20px ${f}`;
        ctx.fillText(sub, 104, y + 52);

        ctx.textAlign = "right";
        ctx.fillStyle = color;
        ctx.font = `600 25px ${f}`;
        ctx.fillText(amt, w - 32, y + 37);
        ctx.textAlign = "left";
      });
    },
  },
  {
    id: "nav",
    w: 1.3,
    h: 0.24,
    y: -1.41,
    from: [0.2, -4.2, 2.4],
    rot: [1.2, 0.2, -0.3],
    draw: (ctx, w, h, f) => {
      rr(ctx, 2, 2, w - 4, h - 4, (h - 4) / 2);
      ctx.fillStyle = "#121317";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 3;
      ctx.stroke();

      const slots = 4;
      const sw = (w - 24) / slots;
      for (let i = 0; i < slots; i++) {
        const cx = 12 + sw * i + sw / 2;
        const cy = h / 2;
        if (i === 0) {
          rr(ctx, cx - 70, cy - 36, 140, 72, 36);
          ctx.fillStyle = "#ffffff";
          ctx.fill();
          ctx.fillStyle = "#000";
          ctx.font = `600 24px ${f}`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Home", cx, cy + 1);
        } else {
          rr(ctx, cx - 18, cy - 18, 36, 36, 10);
          ctx.strokeStyle = "rgba(255,255,255,0.55)";
          ctx.lineWidth = 3.5;
          ctx.stroke();
        }
      }
    },
  },
];

/* ------------------------------------------------------------------ */
/* Screen base: black + status bar                                     */
/* ------------------------------------------------------------------ */

export function createScreenTexture() {
  return makeTexture(SCREEN.w, SCREEN.h, (ctx, w, h, f) => {
    rr(ctx, 0, 0, w, h, 0.18 * PX);
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#08080a");
    bg.addColorStop(1, "#030304");
    ctx.fillStyle = bg;
    ctx.fill();

    // Status bar (sits beside the dynamic island)
    const cy = 48;
    ctx.fillStyle = "#ffffff";
    ctx.font = `600 28px ${f}`;
    ctx.textBaseline = "middle";
    ctx.fillText("9:41", 78, cy);

    // Signal bars
    const sx = w - 190;
    [10, 15, 20, 25].forEach((bh, i) => {
      rr(ctx, sx + i * 10, cy + 12 - bh, 6, bh, 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    });

    // Battery
    const bx = w - 132;
    rr(ctx, bx, cy - 13, 50, 26, 7);
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    rr(ctx, bx + 4, cy - 9, 36, 18, 4);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    rr(ctx, bx + 53, cy - 5, 4, 10, 2);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fill();
  });
}

/* Dashed outline for an empty slot */
export function createSlotTexture(wUnits: number, hUnits: number) {
  return makeTexture(wUnits, hUnits, (ctx, w, h) => {
    ctx.setLineDash([14, 12]);
    ctx.strokeStyle = "rgba(255,255,255,0.16)";
    ctx.lineWidth = 3;
    rr(ctx, 3, 3, w - 6, h - 6, 28);
    ctx.stroke();
  });
}

/* Outline used for the "live" signal pulse */
export function createRingTexture(wUnits: number, hUnits: number) {
  return makeTexture(wUnits, hUnits, (ctx, w, h) => {
    rr(ctx, 6, 6, w - 12, h - 12, 0.3 * PX);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 5;
    ctx.stroke();
  });
}

/* Soft glow behind the phone */
export function createGlowTexture() {
  return makeTexture(2, 2, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,0.55)");
    g.addColorStop(0.4, "rgba(220,226,240,0.15)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}
