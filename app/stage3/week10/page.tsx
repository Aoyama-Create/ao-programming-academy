import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function Stage3Week10Page() {
  const content = getContent("stage3-week10");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
