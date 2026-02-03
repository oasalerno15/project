import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumina Interactive List",
  description: "A beautiful WebGL-powered image slider with glass effects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
