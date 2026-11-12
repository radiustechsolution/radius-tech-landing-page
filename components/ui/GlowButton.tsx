import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "silver" | "outline";
type Size = "sm" | "md" | "lg";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-6 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-base",
};

function Anchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function GlowButton({
  href,
  children,
  className,
  variant = "outline",
  size = "md",
  onClick,
}: Props) {
  /* Blue primary — main call to action */
  if (variant === "primary") {
    return (
      <Anchor
        href={href}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center rounded-[10px] bg-brand font-medium text-white",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_40px_-12px_rgba(29,93,255,0.7)]",
          "transition-all duration-300 hover:bg-brand-400 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_14px_50px_-10px_rgba(29,93,255,0.9)]",
          sizes[size],
          className,
        )}
      >
        {children}
      </Anchor>
    );
  }

  /* Silver — polished metal button */
  if (variant === "silver") {
    return (
      <Anchor
        href={href}
        onClick={onClick}
        className={cn(
          "inline-flex items-center justify-center rounded-[10px] font-medium text-black",
          "bg-linear-to-b from-white via-silver-100 to-silver-300",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.15),0_10px_30px_-12px_rgba(255,255,255,0.35)]",
          "transition-all duration-300 hover:brightness-110",
          sizes[size],
          className,
        )}
      >
        {children}
      </Anchor>
    );
  }

  /* Outline — silver light running around the edge */
  return (
    <Anchor
      href={href}
      onClick={onClick}
      className={cn(
        "group relative isolate inline-flex overflow-hidden rounded-[11px] p-px",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 size-[600px] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="conic-beam block size-full animate-spin-slow" />
      </span>
      <span
        aria-hidden
        className="absolute inset-0 -z-20 rounded-[11px] bg-white/12"
      />

      <span
        className={cn(
          "relative inline-flex w-full items-center justify-center rounded-[10px] bg-ink font-medium text-white transition-colors duration-300 group-hover:bg-ink-3",
          sizes[size],
        )}
      >
        {children}
      </span>
    </Anchor>
  );
}
