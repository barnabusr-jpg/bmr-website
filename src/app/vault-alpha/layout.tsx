import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMR // VAULT-ALPHA",
  description: "Forensic Logic Decay Screening",
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[100dvh] bg-[#020617] w-full relative">
      {children}
    </section>
  );
}
