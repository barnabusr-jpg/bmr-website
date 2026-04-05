import React from "react";
import "../styles/globals.css"; // The exact forensic path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#020617] antialiased selection:bg-red-600/30">
        {children}
      </body>
    </html>
  );
}
