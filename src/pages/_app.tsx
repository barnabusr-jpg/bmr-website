import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"; // Added this import

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            <Component {...pageProps} />
            {/* This component is global. 
                It allows the 'Message Sent' toast to appear 
                regardless of which page the user is on. 
            */}
            <Toaster /> 
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </main>
  );
}
