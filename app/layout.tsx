import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RailOps Manager",
  description:
    "Unified train fleet, scheduling, and maintenance management for rail operators."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
