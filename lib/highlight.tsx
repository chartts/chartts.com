import { createHighlighter } from "shiki";

let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark-dimmed", "github-light"],
      langs: ["tsx", "typescript", "bash", "css", "html", "json"],
    });
  }
  return highlighter;
}

export async function CodeBlock({
  code,
  lang = "tsx",
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const h = await getHighlighter();
  const html = h.codeToHtml(code.trim(), {
    lang,
    themes: { dark: "github-dark-dimmed", light: "github-light" },
  });

  return (
    <div className="window-frame mb-6">
      {filename && (
        <div className="window-titlebar">
          <div className="window-dot bg-[#ff5f57]" />
          <div className="window-dot bg-[#febc2e]" />
          <div className="window-dot bg-[#28c840]" />
          <span className="ml-3 text-xs muted-text font-mono">{filename}</span>
        </div>
      )}
      <div
        className="shiki-block overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
