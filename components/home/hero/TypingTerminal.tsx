"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Line = { kind: "cmd" | "ok" | "done"; text: string };

const script: Line[] = [
  { kind: "cmd", text: "radius create app" },
  { kind: "ok", text: "UI designed" },
  { kind: "ok", text: "API built" },
  { kind: "ok", text: "Deployed" },
  { kind: "done", text: "Live" },
];

export function TypingTerminal({ className }: { className?: string }) {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (line >= script.length) {
      const t = setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 2600);
      return () => clearTimeout(t);
    }

    const current = script[line];

    if (chars < current.text.length) {
      const speed = current.kind === "cmd" ? 50 : 28;
      const t = setTimeout(() => setChars((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    const t = setTimeout(
      () => {
        setLine((l) => l + 1);
        setChars(0);
      },
      current.kind === "cmd" ? 500 : 350,
    );
    return () => clearTimeout(t);
  }, [line, chars]);

  return (
    <div
      className={cn(
        "w-[210px] overflow-hidden rounded-lg border border-white/10 bg-black/60 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.9)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="border-b border-white/[0.07] px-3 py-1.5">
        <span className="font-mono text-[10px] text-silver-500">
          radius — build
        </span>
      </div>

      <div className="min-h-[112px] space-y-1 px-3 py-2.5 font-mono text-[11px] leading-relaxed">
        {script.slice(0, Math.min(line + 1, script.length)).map((l, i) => {
          const isCurrent = i === line;
          const text = isCurrent ? l.text.slice(0, chars) : l.text;

          return (
            <div key={i} className="flex gap-1.5">
              {l.kind === "cmd" && <span className="text-silver-600">$</span>}
              {l.kind !== "cmd" && (
                <span
                  className={
                    l.kind === "done" ? "text-white" : "text-silver-300"
                  }
                >
                  ✓
                </span>
              )}
              <span
                className={cn(
                  l.kind === "cmd" && "text-white",
                  l.kind === "ok" && "text-silver-400",
                  l.kind === "done" && "font-semibold text-white",
                )}
              >
                {text}
                {isCurrent && (
                  <motion.span
                    aria-hidden
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="ml-0.5 inline-block h-[11px] w-[6px] translate-y-[2px] bg-silver-200"
                  />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
