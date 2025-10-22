import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ClientNavbar } from "@/components/NavBar/NavbarWrapper";
import Script from "next/script";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "Publino | Next.js Landing Page Template",
  description:
    "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
  keywords: [
    "next.js",
    "landing page",
    "template",
    "Publino",
    "responsive",
    "modern design",
    "high-performance",
  ],
  authors: [{ name: "Mohammed Djoudir" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Publino | Next.js Landing Page Template",
    description:
      "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
    type: "website",
    locale: "en_US",
    url: "https://publino-template.vercel.app",
    siteName: "Publino Templates",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Publino Next.js Template Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publino | Next.js Landing Page Template",
    description:
      "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
    images: ["/image.png"],
    creator: "@aniq_ui",
    site: "@aniq_ui",
  },
  metadataBase: new URL("https://publino-template.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-theme="dark">
      <head>
        {/* Favicon and Manifest Links */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
 
      </head>
      <body
        className={`bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200 antialiased overflow-hidden overflow-y-auto`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <div className="flex flex-col ">
            <ClientNavbar />
            <main
              id="main-content"
              className="flex-1 container mx-auto max-w-[1400px] px-4 py-8"
            >
              {children}
            </main>
            <footer
              id="site-footer"
              className="py-8 relative bg-white dark:bg-black"
            >
              <div className="container mx-auto max-w-[1400px] px-4">
                <div className="flex justify-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © 2025 Publino Templates. All rights reserved.
                  </p>
                </div>
                {process.env.NEXT_PUBLIC_STATUS === "live" && (
                  <div
                    id="buy-button-container"
                    className="absolute bottom-16 sm:bottom-5 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 z-50 "
                  >
                    <a
                      href="http://aniq-ui.com/templates/publino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex text-nowrap items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                      aria-label="Buy Publino Template"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="hidden sm:block text-sm font-medium">
                        Buy this template
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </footer>
          </div>
        </ThemeProvider>

        {/* Structured Data for SEO */}
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Publino Next.js Template",
              "description": "Modern Next.js landing page template: Responsive, dark mode, SEO optimized, high-performance. Includes premium components.",
              "image": "https://publino-template.vercel.app/image.png",
              "url": "https://publino-template.vercel.app",
              "brand": {
                "@type": "Brand",
                "name": "Publino Templates"
              },
              "offers": {
                "@type": "Offer",
                "url": "http://aniq-ui.com/templates/publino",
                "availability": "https://schema.org/InStock"
              },
              "category": "Web Templates",
              "sku": "publino-next-template",
              "potentialAction": {
                "@type": "BuyAction",
                "target": "http://aniq-ui.com/templates/publino"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
