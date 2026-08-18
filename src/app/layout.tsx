import "@/styles/globals.css";
import React from "react";

export const metadata = {
  title: "BMR Solutions // Executive Results Portal",
  description: "Independent forensic observer & AI readiness governance control plane.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050811] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
