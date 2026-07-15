import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage7Week26Page() {
  const content = getContent("stage7-week26");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
