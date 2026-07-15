import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage1Page() {
  const content = getContent("stage1");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
