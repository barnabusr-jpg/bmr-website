import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"; // 1. Add this import

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Component {...pageProps} />
            <Toaster /> {/* 2. Add this here to enable confirmations */}
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </main>
  );
}
