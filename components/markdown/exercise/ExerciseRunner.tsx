"use client";

import { lazy, Suspense } from "react";
import { Skeleton } from "@mantine/core";

/*
 * 薄いクライアントラッパ。実体（エディタ＋実行＋採点＋Mantine の Button 等）は
 * React.lazy で別チャンクに分離し、演習ブロックの無いページには載せない。
 * next/dynamic ではなく React.lazy を使うのは、dynamic のローダブル実行時ランタイムを
 * 全 Markdown ページに載せないため（それだけで ~11kB 増えていた）。
 */
const Impl = lazy(() =>
  import("./ExerciseRunnerImpl").then((m) => ({ default: m.ExerciseRunnerImpl }))
);

export function ExerciseRunner({ spec }: { spec: string }) {
  return (
    <Suspense
      fallback={
        <div className="exercise-card">
          <Skeleton height={24} width="40%" mb="md" />
          <Skeleton height={120} radius="sm" />
        </div>
      }
    >
      <Impl spec={spec} />
    </Suspense>
  );
}
