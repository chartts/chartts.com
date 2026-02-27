import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl sm:text-4xl font-extrabold tracking-tight heading mt-12 mb-4 first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-bold heading mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-semibold heading mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => (
    <p className="body-text leading-relaxed mb-4" {...props} />
  ),
  a: (props) => (
    <a
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors cursor-pointer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="body-text list-disc pl-6 mb-4 space-y-1" {...props} />
  ),
  ol: (props) => (
    <ol className="body-text list-decimal pl-6 mb-4 space-y-1" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-cyan-500/40 pl-4 my-6 body-text italic"
      {...props}
    />
  ),
  code: (props) => {
    // Block code from rehype-pretty-code uses data-language or language- class
    const isBlock =
      (typeof props.className === "string" && props.className.includes("language-")) ||
      "data-language" in (props as Record<string, unknown>) ||
      "data-theme" in (props as Record<string, unknown>);
    if (isBlock) return <code {...props} />;
    return (
      <code
        className="px-1.5 py-0.5 rounded text-cyan-500 text-sm font-mono"
        style={{ background: "var(--c-card-bg)" }}
        {...props}
      />
    );
  },
  pre: (props) => {
    // rehype-pretty-code adds data-language/data-theme to pre — don't override its styling
    const isHighlighted =
      "data-language" in (props as Record<string, unknown>) ||
      "data-theme" in (props as Record<string, unknown>);
    if (isHighlighted) return <pre {...props} />;
    return (
      <pre
        className="window-frame p-6 overflow-x-auto text-sm font-mono leading-relaxed mb-6"
        {...props}
      />
    );
  },
  hr: () => (
    <hr className="my-8" style={{ borderColor: "var(--c-border)" }} />
  ),
  strong: (props) => <strong className="heading font-semibold" {...props} />,
  table: (props) => (
    <div className="overflow-x-auto mb-6 rounded-lg" style={{ border: "1px solid var(--c-border)" }}>
      <table className="w-full text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead style={{ background: "var(--c-card-bg)" }} {...props} />
  ),
  th: (props) => (
    <th
      className="text-left py-3 px-4 heading font-semibold text-xs uppercase tracking-wider"
      style={{ borderBottom: "1px solid var(--c-border)" }}
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="py-3 px-4 body-text"
      style={{ borderBottom: "1px solid var(--c-grid-subtle)" }}
      {...props}
    />
  ),
  tr: (props) => (
    <tr
      className="transition-colors"
      style={{ borderBottom: "1px solid var(--c-grid-subtle)" }}
      {...props}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-xl my-6 max-w-full" alt="" {...props} />
  ),
};
