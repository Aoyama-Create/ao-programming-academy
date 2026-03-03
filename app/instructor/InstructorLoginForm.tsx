"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, PasswordInput, Text } from "@mantine/core";
import { verifyInstructorPassword } from "./actions";

export function InstructorLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const result = await verifyInstructorPassword(formData);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error ?? "パスコードが正しくありません。");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm space-y-4">
      <Text size="sm" c="dimmed">
        講師・採点者用です。パスコードを入力すると解答一覧を表示します。
      </Text>
      <PasswordInput
        name="password"
        label="パスコード"
        placeholder="パスコードを入力"
        error={error ?? undefined}
        autoComplete="current-password"
      />
      <Button type="submit">確認</Button>
    </form>
  );
}
