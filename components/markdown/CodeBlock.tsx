/*
 * サーバコンポーネント。全ルートが静的プリレンダリングなので、
 * ハイライトはビルド時に確定し、クライアントには JS を 1 バイトも送らない。
 *
 * `Prism` をルートから import すると Prism の全言語文法が同梱されてしまうため、
 * PrismLight に content/ で実際に使っている言語だけを登録する。
 */
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import gherkin from "react-syntax-highlighter/dist/esm/languages/prism/gherkin";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("gherkin", gherkin);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("ts", typescript);

type CodeBlockProps = {
  language: string;
  children: string;
};

export function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      PreTag="div"
      className="code-block"
      customStyle={{ margin: 0, padding: "1rem" }}
    >
      {children}
    </SyntaxHighlighter>
  );
}
