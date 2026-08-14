import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-10 text-2xl font-semibold tracking-tight text-text-primary">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-8 text-xl font-semibold text-text-primary">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-text-muted">{children}</p>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 ml-6 list-disc space-y-1 text-text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1 text-text-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-4 border-accent/40 py-1 pl-4 text-text-muted italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-accent font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className} text-sm font-mono`}>{children}</code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl border border-zinc-700/30 bg-zinc-900/50 p-4 text-sm leading-6">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm text-text-muted">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-zinc-700/30 px-4 py-2 text-left font-semibold text-text-primary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-zinc-700/30 px-4 py-2">{children}</td>
  ),
  hr: () => <hr className="my-8 border-zinc-700/30" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ""} className="my-6 rounded-lg" />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
