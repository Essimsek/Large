import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Large",
  description: "Create and publish your own startups with Large",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
