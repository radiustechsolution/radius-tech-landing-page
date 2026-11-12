import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** offset so cards don't animate in sync (negative seconds) */
  delay?: number;
  /** seconds per full lap of the light */
  speed?: number;
};

export function BeamCard({ children, className, delay = 0, speed = 7 }: Props) {
  return (
    <div
      className={cn(
        "beam-card group relative isolate overflow-hidden rounded-2xl bg-ink-2",
        className,
      )}
      style={
        {
          "--beam-delay": `${delay}s`,
          "--beam-speed": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div className="spot-fill pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}
