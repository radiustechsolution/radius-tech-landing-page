"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "./PostBanner";
import { youtubeThumb } from "@/lib/blog-utils";

/** Shows the thumbnail first; loads YouTube only when the reader presses play (keeps pages fast) */
export function YouTubePlayer({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(youtubeThumb(id, "maxres"));

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0"
        >
          <Image
            src={thumb}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
            onError={() => setThumb(youtubeThumb(id, "hq"))}
          />
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute inset-0 grid place-items-center">
            <PlayIcon className="size-16 md:size-20" />
          </span>
        </button>
      )}
    </div>
  );
}
