import React from "react";

export const metadata = {
  title: "BMR SOLUTIONS",
  description: "Forensic Logic Decay Screening",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#020617', color: 'white', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
