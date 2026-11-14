import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Styled article body */
export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-14 mb-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="my-5 text-[17px] leading-[1.8] text-silver-300">
            {children}
          </p>
        ),
        a: ({ href, children }) => {
          const external = href?.startsWith("http");
          return (
            <a
              href={href}
              className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-white">{children}</strong>
        ),
        ul: ({ children }) => <ul className="my-5 space-y-2.5">{children}</ul>,
        ol: ({ children }) => (
          <ol className="my-5 list-decimal space-y-2.5 pl-6 marker:text-silver-500">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="relative pl-6 text-[17px] leading-[1.7] text-silver-300 [ol>&]:pl-1 [ul>&]:before:absolute [ul>&]:before:top-[0.85em] [ul>&]:before:left-0 [ul>&]:before:h-px [ul>&]:before:w-3 [ul>&]:before:bg-silver-500">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-8 border-l-2 border-white/40 pl-6 font-serif text-2xl leading-snug text-white italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-12 border-white/10" />,
        code: ({ children, className }) =>
          className ? (
            <code className={className}>{children}</code>
          ) : (
            <code className="rounded-md bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.9em] text-white">
              {children}
            </code>
          ),
        pre: ({ children }) => (
          <pre className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-ink-2 p-5 font-mono text-sm leading-relaxed text-silver-200">
            {children}
          </pre>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" ? src : ""}
            alt={alt ?? ""}
            loading="lazy"
            className="my-8 w-full rounded-2xl border border-white/10"
          />
        ),
        table: ({ children }) => (
          <div className="my-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-left text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-white/10 bg-white/[0.03] px-4 py-3 font-medium text-white">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-white/[0.06] px-4 py-3 text-silver-300">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
