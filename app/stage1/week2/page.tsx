import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage1Week2Page() {
  const content = getContent("stage1-week2");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
