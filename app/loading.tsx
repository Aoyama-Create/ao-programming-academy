import { Skeleton } from "@mantine/core";

/*
 * App Router が route segment を自動で <Suspense> に包むため、
 * リンクを踏んだ瞬間にこれが出る（遷移の確定を待たない）。
 */
export default function Loading() {
  return (
    <main className="page-main" aria-busy="true">
      <Skeleton height={34} width="60%" radius="sm" mb="xl" />

      <Skeleton height={12} radius="sm" mb="sm" />
      <Skeleton height={12} radius="sm" mb="sm" />
      <Skeleton height={12} width="85%" radius="sm" mb="xl" />

      <Skeleton height={22} width="35%" radius="sm" mb="md" />
      <Skeleton height={12} radius="sm" mb="sm" />
      <Skeleton height={12} radius="sm" mb="sm" />
      <Skeleton height={12} width="70%" radius="sm" mb="xl" />

      <Skeleton height={120} radius="sm" mb="xl" />

      <Skeleton height={22} width="45%" radius="sm" mb="md" />
      <Skeleton height={12} radius="sm" mb="sm" />
      <Skeleton height={12} width="90%" radius="sm" />
    </main>
  );
}
