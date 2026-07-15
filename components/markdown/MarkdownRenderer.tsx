/*
 * サーバコンポーネント。react-markdown / remark-gfm / rehype-raw / rehype-slug は
 * すべてサーバ側に留まり、クライアントバンドルには載らない。
 * マークダウンのパースも 1 回だけ（以前はサーバとブラウザで二重にパースしていた）。
 */
import React, { Children, isValidElement } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";

import { CodeBlock } from "./CodeBlock";
import { MermaidDiagram } from "./MermaidDiagram";

type MarkdownRendererProps = {
  content: string;
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          a: ({ href, children }) => {
            const target = href ?? "#";
            // 内部リンクは next/link に通してクライアント遷移させる。
            // 素の <a> だとフルリロードになり、遷移が遅く画面もチラつく。
            if (target.startsWith("/")) {
              return <Link href={target}>{children}</Link>;
            }
            if (target.startsWith("#")) {
              return <a href={target}>{children}</a>;
            }
            return (
              <a href={target} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          pre: ({ children }) => {
            const child = Children.only(children);
            const props = isValidElement(child)
              ? (child.props as { className?: string })
              : null;
            // CodeBlock は自前で <div> を出すので、<pre> で二重に包まない。
            if (props?.className?.includes("code-block")) {
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
              return <CodeBlock language={match[1]}>{code}</CodeBlock>;
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="table-scroll">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
