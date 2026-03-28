"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * BMR FORENSIC UNIT: STABLE THEME PROVIDER
 * We've removed the explicit 'ThemeProviderProps' import to bypass 
 * the library export discrepancy that is currently blocking the build.
 */
export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children: React.ReactNode; 
  [key: string]: any 
}) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
