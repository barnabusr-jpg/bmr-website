import React from "react";

export const metadata = {
  title: "BMR // VAULT-ALPHA",
  description: "Forensic Logic Decay Screening",
};

export default function VaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-[#020617]">
      {children}
    </section>
  );
}
