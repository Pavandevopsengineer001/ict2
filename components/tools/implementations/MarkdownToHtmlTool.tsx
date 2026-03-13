"use client";

import { useState, useEffect } from "react";
import { FileText, Copy, Check, Eye } from "lucide-react";

export default function MarkdownToHtmlTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const convertToHtml = (markdown: string): string => {
    let html = markdown;

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, "<h6>$1</h6>");
    html = html.replace(/^#####\s+(.+)$/gm, "<h5>$1</h5>");
    html = html.replace(/^####\s+(.+)$/gm, "<h4>$1</h4>");
    html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s+(.+)$/gm, "<h1>$1</h1>");

    // Bold and Italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/___(.+?)___/g, "<strong><em>$1</em></strong>");
    html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
    html = html.replace(/_(.+?)_/g, "<em>$1</em>");

    // Strikethrough
    html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Blockquotes
    html = html.replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>");

    // Horizontal rule
    html = html.replace(/^---$/gm, "<hr>");
    html = html.replace(/^\*\*\*$/gm, "<hr>");

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Unordered lists
    const ulPattern = /^[-*+]\s+.+(?:\n[-*+]\s+.+)*/gm;
    html = html.replace(ulPattern, (match) => {
      const items = match
        .split("\n")
        .map((line) => line.replace(/^[-*+]\s+/, ""))
        .map((item) => `<li>${item}</li>`)
        .join("\n");
      return `<ul>\n${items}\n</ul>`;
    });

    // Ordered lists
    const olPattern = /^\d+\.\s+.+(?:\n\d+\.\s+.+)*/gm;
    html = html.replace(olPattern, (match) => {
      const items = match
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s+/, ""))
        .map((item) => `<li>${item}</li>`)
        .join("\n");
      return `<ol>\n${items}\n</ol>`;
    });

    // Tables
    const tablePattern = /^\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/gm;
    html = html.replace(tablePattern, (_, header, body) => {
      const headers = header
        .split("|")
        .filter((h: string) => h.trim())
        .map((h: string) => `<th>${h.trim()}</th>`)
        .join("");
      
      const rows = body
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td>${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("\n");

      return `<table>\n<thead><tr>${headers}</tr></thead>\n<tbody>\n${rows}\n</tbody>\n</table>`;
    });

    // Paragraphs (wrap remaining text)
    html = html.replace(/^(?!<[a-z])((?:[^\n]+\n?)+)/gm, (match) => {
      const trimmed = match.trim();
      if (trimmed && !trimmed.startsWith("<")) {
        return `<p>${trimmed}</p>`;
      }
      return match;
    });

    // Clean up extra newlines
    html = html.replace(/\n{3,}/g, "\n\n");

    return html.trim();
  };

  useEffect(() => {
    if (input) {
      setOutput(convertToHtml(input));
    } else {
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadSample = () => {
    setInput(`# Heading 1
## Heading 2
### Heading 3

This is a paragraph with **bold text** and *italic text*.

- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

> This is a blockquote

Here is some \`inline code\` and a code block:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

[Link to Google](https://google.com)

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data     | Data     |
| Row 2    | Data     | Data     |

---

That's all folks!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={loadSample}
          className="px-3 py-1.5 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors"
        >
          Load Sample
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
            showPreview ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
          }`}
        >
          <Eye className="w-4 h-4" />
          {showPreview ? "Show HTML" : "Show Preview"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Markdown Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Enter your markdown here..."
            className="tool-panel-input min-h-[400px] font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted-foreground">
              {showPreview ? "Preview" : "HTML Output"}
            </label>
            {output && !showPreview && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-muted hover:bg-muted/80 text-sm transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy HTML"}
              </button>
            )}
          </div>
          {showPreview ? (
            <div
              className="tool-panel-output min-h-[400px] prose prose-sm dark:prose-invert max-w-none overflow-auto p-4"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          ) : (
            <pre className="tool-panel-output min-h-[400px] font-mono text-sm whitespace-pre-wrap overflow-auto">
              {output || <span className="text-muted-foreground">HTML output will appear here</span>}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
