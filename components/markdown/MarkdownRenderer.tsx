"use client";

import React, { Children, isValidElement } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const LazySyntaxHighlighter = dynamic(
  () => import("./LazySyntaxHighlighter").then((m) => ({ default: m.LazySyntaxHighlighter })),
  { ssr: false, loading: () => <pre className="rounded bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto text-sm"><code>読み込み中...</code></pre> }
);

const MermaidDiagram = dynamic(
  () => import("./MermaidDiagram").then((m) => ({ default: m.MermaidDiagram })),
  { ssr: false, loading: () => <div className="h-24 rounded bg-gray-100 dark:bg-gray-800 animate-pulse" /> }
);

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ href, children }) => (
          <a href={href ?? "#"} className="text-blue-600 underline hover:text-blue-800">
            {children}
          </a>
        ),
        pre: ({ children }) => {
          const child = Children.only(children);
          const props = isValidElement(child) ? (child.props as { className?: string }) : null;
          const className = props?.className ?? "";
          if (className.includes("code-block-wrapper")) {
            return <>{children}</>;
          }
          return <pre>{children}</pre>;
        },
        code: ({ className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className ?? "");
          const code = String(children).replace(/\n$/, "");
          if (match?.[1] === "mermaid") {
            return <MermaidDiagram chart={code} />;
          }
          if (match) {
            return (
              <LazySyntaxHighlighter language={match[1]}>
                {code}
              </LazySyntaxHighlighter>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div style={{ margin: "1.5rem 0", width: "100%", overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                minWidth: 480,
                borderCollapse: "collapse",
                border: "1px solid #d1d5db",
                fontSize: "0.875rem",
              }}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead style={{ backgroundColor: "#f3f4f6" }}>{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => (
          <th
            style={{
              border: "1px solid #d1d5db",
              padding: "0.5rem 0.75rem",
              textAlign: "left",
              fontWeight: 600,
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            style={{
              border: "1px solid #d1d5db",
              padding: "0.5rem 0.75rem",
              verticalAlign: "top",
            }}
          >
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
