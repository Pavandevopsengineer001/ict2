"use client";

import { useState, useMemo } from "react";
import { FileText, Eye, Code, Copy, Check } from "lucide-react";

export default function MarkdownPreviewTool() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

This tool helps you **preview** your *Markdown* content in real-time.

## Features

- Live preview as you type
- Syntax highlighting
- Copy rendered HTML

### Code Example

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "Markdown is a lightweight markup language."

| Feature | Supported |
|---------|-----------|
| Headers | Yes |
| Lists | Yes |
| Tables | Yes |
| Code | Yes |

---

Learn more at [Markdown Guide](https://www.markdownguide.org)`);
  const [view, setView] = useState<"split" | "preview" | "source">("split");
  const [copied, setCopied] = useState(false);

  const parseMarkdown = (md: string): string => {
    let html = md
      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Horizontal rule
      .replace(/^---$/gim, '<hr />')
      // Unordered lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br />');

    // Wrap in paragraph
    html = '<p>' + html + '</p>';
    
    // Clean up list items
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');
    
    // Simple table parsing
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim());
      if (cells.every(c => /^[-:]+$/.test(c))) return '';
      const tag = cells.some(c => /^[-:]+$/.test(c)) ? 'th' : 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>';
    });
    html = html.replace(/(<tr>.*<\/tr>)+/gs, '<table>$&</table>');

    return html;
  };

  const renderedHtml = useMemo(() => parseMarkdown(markdown), [markdown]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(renderedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {[
            { key: "split", icon: Eye, label: "Split" },
            { key: "preview", icon: Eye, label: "Preview" },
            { key: "source", icon: Code, label: "Source" },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key as typeof view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                view === v.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <v.icon className="w-4 h-4" />
              {v.label}
            </button>
          ))}
        </div>
        <button
          onClick={copyHtml}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          Copy HTML
        </button>
      </div>

      <div className={`grid gap-4 ${view === "split" ? "md:grid-cols-2" : ""}`}>
        {(view === "split" || view === "source") && (
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Markdown
            </label>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="tool-panel-input min-h-[500px] font-mono"
              placeholder="Write your markdown here..."
            />
          </div>
        )}

        {(view === "split" || view === "preview") && (
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </label>
            <div
              className="tool-panel-output min-h-[500px] prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-primary prose-blockquote:text-muted-foreground prose-table:border-collapse prose-th:border prose-th:border-border prose-th:p-2 prose-td:border prose-td:border-border prose-td:p-2"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
