"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

type Props = {
  language: string;
  children: string;
};

export function LazySyntaxHighlighter({ language, children }: Props) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      className="code-block-wrapper"
      showLineNumbers={false}
      customStyle={{ margin: 0 }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
