"use client";

import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(title);
  const link = encodeURIComponent(url);

  const targets = [
    { label: "WhatsApp", href: `https://wa.me/?text=${text}%20${link}` },
    { label: "X", href: `https://x.com/intent/post?text=${text}&url=${link}` },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${link}`,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-500">
        Share
      </span>
      {targets.map((t) => (
        <a
          key={t.label}
          href={t.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[10px] border border-white/10 px-3.5 py-2 text-sm text-silver-300 transition-colors hover:border-white/25 hover:text-white"
        >
          {t.label}
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        className="rounded-[10px] border border-white/10 px-3.5 py-2 text-sm text-silver-300 transition-colors hover:border-white/25 hover:text-white"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
