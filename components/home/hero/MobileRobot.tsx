/* Lightweight drawn robot for phones and tablets: CSS animations only, no 3D */
export function MobileRobot() {
  const bars = [0, 1, 2, 3, 4];

  return (
    <div className="mobile-robot relative flex h-full w-full items-center justify-center">
      {/* Orbit rings (static on phones) */}
      <div className="absolute size-[310px] rounded-full border border-dashed border-white/15" />
      <div className="absolute size-[240px] rounded-full border border-white/10">
        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[3px] bg-white" />
      </div>

      <div className="absolute size-[260px] rounded-full bg-[radial-gradient(closest-side,rgba(217,220,227,0.14),transparent)]" />

      <svg
        viewBox="0 0 240 310"
        className="relative w-[210px] animate-float [animation-duration:5s] sm:w-[240px]"
      >
        <defs>
          <linearGradient id="mr-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#c8ccd4" />
            <stop offset="1" stopColor="#6b707a" />
          </linearGradient>
          <linearGradient id="mr-dark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#24262b" />
            <stop offset="1" stopColor="#0b0c0e" />
          </linearGradient>
        </defs>

        <ellipse cx="120" cy="300" rx="70" ry="7" fill="#000" opacity="0.6" />

        <rect
          x="117"
          y="14"
          width="6"
          height="28"
          rx="3"
          fill="url(#mr-dark)"
        />
        <circle
          cx="120"
          cy="12"
          r="8"
          fill="#ffffff"
          className="svg-self animate-glow"
        />

        <rect
          x="26"
          y="80"
          width="16"
          height="40"
          rx="7"
          fill="url(#mr-dark)"
        />
        <rect
          x="198"
          y="80"
          width="16"
          height="40"
          rx="7"
          fill="url(#mr-dark)"
        />

        <rect
          x="40"
          y="40"
          width="160"
          height="120"
          rx="30"
          fill="url(#mr-metal)"
        />
        <rect x="58" y="68" width="124" height="66" rx="18" fill="#050506" />

        <g className="svg-self animate-look">
          <rect
            x="88"
            y="86"
            width="16"
            height="30"
            rx="8"
            fill="#f2f5ff"
            className="svg-self animate-blink"
          />
          <rect
            x="136"
            y="86"
            width="16"
            height="30"
            rx="8"
            fill="#f2f5ff"
            className="svg-self animate-blink"
          />
        </g>

        <rect
          x="104"
          y="160"
          width="32"
          height="16"
          rx="4"
          fill="url(#mr-dark)"
        />
        <rect
          x="50"
          y="174"
          width="140"
          height="100"
          rx="36"
          fill="url(#mr-metal)"
        />

        <rect x="82" y="200" width="76" height="40" rx="10" fill="#050506" />
        {bars.map((b) => (
          <rect
            key={b}
            x={93 + b * 12}
            y={208}
            width={6}
            height={24}
            rx={2}
            fill="#ffffff"
            className="svg-self-bottom animate-eq"
            style={{ animationDelay: `-${b * 0.25}s` }}
          />
        ))}

        <circle
          cx="22"
          cy="222"
          r="16"
          fill="url(#mr-metal)"
          className="svg-self animate-float"
        />
        <circle
          cx="218"
          cy="222"
          r="16"
          fill="url(#mr-metal)"
          className="svg-self animate-float"
          style={{ animationDelay: "-1.5s" }}
        />
      </svg>
    </div>
  );
}
