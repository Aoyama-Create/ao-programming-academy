"use client";

import { AppShell, NavLink, Group, Title } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "トップ" },
  { href: "/preparation", label: "受講開始前の準備" },
  { href: "/stage1", label: "Stage 1 教材" },
  { href: "/weekly", label: "週単位カリキュラム" },
  { href: "/prerequisite", label: "前提知識の接続" },
  { href: "/capstone", label: "Capstone 仕様書" },
  { href: "/rubric", label: "ルーブリック" },
];

export function AppShellNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: 56 }}
      navbar={{ width: 240, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Title order={4}>AoyamaCreate カリキュラム</Title>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            component={Link}
            href={item.href}
            label={item.label}
            active={pathname === item.href}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
