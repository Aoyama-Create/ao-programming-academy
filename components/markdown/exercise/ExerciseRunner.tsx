"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@mantine/core";

/*
 * 薄いクライアントラッパ。spec の kind を見て実行エンジンを振り分け、
 * それぞれ React.lazy で別チャンクに分離する。
 * これで、node-js の演習ページに git-sim のコードは載らない（逆も同様）。
 * next/dynamic ではなく React.lazy を使うのは、dynamic の実行時ランタイムを
 * 全 Markdown ページに載せないため。
 */
const NodeJsImpl = lazy(() =>
  import("./ExerciseRunnerImpl").then((m) => ({ default: m.ExerciseRunnerImpl }))
);
const GitSimImpl = lazy(() =>
  import("./git/GitSimRunner").then((m) => ({ default: m.GitSimRunner }))
);

// kind だけを安全に取り出す。壊れた JSON は node-js に流し、そこでエラー表示させる。
function readKind(raw: string): string {
  try {
    const obj = JSON.parse(raw);
    return typeof obj?.kind === "string" ? obj.kind : "node-js";
  } catch {
    return "node-js";
  }
}

const fallback = (
  <div className="exercise-card">
    <Skeleton height={24} width="40%" mb="md" />
    <Skeleton height={120} radius="sm" />
  </div>
);

export function ExerciseRunner({ spec }: { spec: string }) {
  const kind = readKind(spec);
  const Impl = kind === "git-sim" ? GitSimImpl : NodeJsImpl;
  return <Suspense fallback={fallback}>{<Impl spec={spec} />}</Suspense>;
}
