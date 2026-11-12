import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={cn("size-10 shrink-0", className)}
    >
      <defs>
        <linearGradient
          id="rts-outer"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4D7FFF" />
          <stop offset="1" stopColor="#1D5DFF" />
        </linearGradient>
        <linearGradient
          id="rts-silver"
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#C8CCD4" />
          <stop offset="1" stopColor="#8E939C" />
        </linearGradient>
      </defs>

      {/* Outer ring (brand blue) */}
      <g className="logo-outer">
        <path
          d="M95 50 A45 45 0 1 1 81.82 18.18"
          stroke="url(#rts-outer)"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>

      {/* Inner ring (silver) */}
      <path
        d="M50 21 A29 29 0 1 0 75.11 35.5"
        stroke="url(#rts-silver)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Needle + hex core (silver) */}
      <g className="logo-needle">
        <path d="M50 50 L84 16" stroke="url(#rts-silver)" strokeWidth="8" />
        <polygon
          points="59.66,52.59 52.59,59.66 42.93,57.07 40.34,47.41 47.41,40.34 57.07,42.93"
          fill="url(#rts-silver)"
          stroke="url(#rts-silver)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Radius Tech Solutions — Home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMark />
      <span className="text-[26px] leading-none font-semibold tracking-tight text-white">
        Radius
      </span>
    </Link>
  );
}
