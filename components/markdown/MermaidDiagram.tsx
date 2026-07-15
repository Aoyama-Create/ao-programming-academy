"use client";

import { useEffect, useId, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

let mermaidInitialized = false;

// 同じ図の再描画を避ける。StrictMode の二重発火や、
// 戻る/進むでの再マウント時にそのまま使い回す。
const svgCache = new Map<string, string>();

function ensureMermaidInitialized(mermaid: { initialize: (config: Record<string, unknown>) => void }) {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: "basis",
      diagramPadding: 20,
      wrappingWidth: 280,
    },
    themeVariables: {
      fontSize: "16px",
      fontFamily: "inherit",
    },
  });
  mermaidInitialized = true;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(() => svgCache.get(chart) ?? null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!chart.trim()) return;
    if (svgCache.has(chart)) return;

    let cancelled = false;

    import("mermaid")
      .then((mermaidModule) => {
        const mermaid = mermaidModule.default;
        ensureMermaidInitialized(mermaid);
        const uniqueId = `mermaid-${id}-${Math.random().toString(36).slice(2, 9)}`;
        return mermaid.render(uniqueId, chart);
      })
      .then((result) => {
        if (!result.svg) return;
        svgCache.set(chart, result.svg);
        if (!cancelled) {
          setSvg(result.svg);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message ?? "Mermaid render failed");
          setSvg(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <div className="mermaid-error">
        <strong>図の描画エラー:</strong> {error}
        <pre>{chart}</pre>
      </div>
    );
  }

  if (svg) {
    return (
      <div
        className="mermaid-wrapper"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    );
  }

  return <div className="mermaid-placeholder" aria-busy="true" />;
}
