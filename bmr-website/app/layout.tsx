import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bmrsolutions.example"),
  title: {
    default: "BMR Solutions | Responsible AI & Delivery Systems",
    template: "%s – BMR Solutions",
  },
  description:
    "We help CIOs and CTOs in regulated industries adopt AI responsibly, modernize delivery, and reduce risk. Trust → Govern → Evolve.",
  openGraph: {
    type: "website",
    title: "BMR Solutions | Responsible AI & Delivery Systems",
    description:
      "Responsible AI governance, Human–AI Interaction enablement, and delivery modernization for healthcare and public sector.",
    url: "https://www.bmrsolutions.example",
    siteName: "BMR Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Solutions | Responsible AI & Delivery Systems",
    description:
      "Trust → Govern → Evolve: practical governance, HAI adoption, and delivery modernization.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
