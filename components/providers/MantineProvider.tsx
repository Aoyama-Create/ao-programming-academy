"use client";

import { MantineProvider as MantineProviderBase } from "@mantine/core";
import "@mantine/core/styles.css";

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProviderBase defaultColorScheme="light">
      {children}
    </MantineProviderBase>
  );
}
