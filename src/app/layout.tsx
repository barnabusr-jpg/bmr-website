import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnostic Forensic Platform",
  description: "Secure forensic diagnostics and report viewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
