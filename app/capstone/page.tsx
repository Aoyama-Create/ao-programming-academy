import { getContent } from "@/lib/content";
import { MarkdownRenderer } from "@/components/markdown/MarkdownRenderer";

export default function CapstonePage() {
  const content = getContent("capstone-spec");
  return (
    <main className="page-main">
      <MarkdownRenderer content={content} />
    </main>
  );
}
