import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage1Week3Page() {
  const content = getContent("stage1-week3");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
