import Image from "next/image";
import { LogoMark } from "@/components/brand/Logo";
import { youtubeThumb, type BlogBanner } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";

export function PlayIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid place-items-center rounded-2xl bg-white text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)] transition-transform duration-300 group-hover:scale-110",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="ml-0.5 size-1/2"
        fill="currentColor"
        aria-hidden
      >
        <path d="M8 5.5v13l10.5-6.5L8 5.5z" />
      </svg>
    </span>
  );
}

/** Branded banner generated when a post has no image or video */
function GeneratedBanner({
  title,
  category,
  size,
}: {
  title: string;
  category: string;
  size: "sm" | "lg";
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <div className="bg-grid absolute inset-0 [mask-image:none] opacity-80" />
      <div className="absolute -top-1/3 left-1/2 h-full w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(217,220,227,0.16),transparent)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-silver-200/60 to-transparent" />

      <div
        className={cn(
          "relative flex h-full flex-col justify-between",
          size === "lg" ? "p-8 md:p-12" : "p-5",
        )}
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "font-mono uppercase tracking-[0.2em] text-silver-400",
              size === "lg" ? "text-xs" : "text-[10px]",
            )}
          >
            {category}
          </span>
          <LogoMark className={size === "lg" ? "size-9" : "size-6"} />
        </div>
        <p
          className={cn(
            "text-gradient max-w-[90%] font-semibold tracking-[-0.02em]",
            size === "lg"
              ? "text-3xl leading-[1.1] md:text-5xl"
              : "line-clamp-3 text-lg leading-snug",
          )}
        >
          {title}
        </p>
      </div>
    </div>
  );
}

export function PostBanner({
  banner,
  title,
  category,
  size = "sm",
  priority = false,
}: {
  banner: BlogBanner;
  title: string;
  category: string;
  size?: "sm" | "lg";
  priority?: boolean;
}) {
  const sizes =
    size === "lg"
      ? "(min-width: 1024px) 900px, 100vw"
      : "(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw";

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-3">
      {banner?.type === "image" && (
        <Image
          src={banner.src}
          alt={banner.alt ?? title}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}

      {banner?.type === "youtube" && (
        <>
          <Image
            src={youtubeThumb(banner.id)}
            alt={title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 grid place-items-center">
            <PlayIcon className={size === "lg" ? "size-16" : "size-12"} />
          </div>
        </>
      )}

      {!banner && (
        <GeneratedBanner title={title} category={category} size={size} />
      )}
    </div>
  );
}
