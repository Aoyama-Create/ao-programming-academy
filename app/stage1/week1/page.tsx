import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage1Week1Page() {
  const content = getContent("stage1-week1");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
