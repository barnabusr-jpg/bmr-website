import React from "react";
// Option A: Using the standard alias (Recommended)
import "@/styles/global.css"; 

// Option B: Using relative pathing if aliases aren't configured
// import "../styles/global.css"; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
