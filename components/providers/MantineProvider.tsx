"use client";

import { MantineProvider as MantineProviderBase } from "@mantine/core";

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProviderBase defaultColorScheme="light">
      {children}
    </MantineProviderBase>
  );
}
