import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const abhayaliFont = localFont({
  src: [
    {
      path: './fonts/AbhayaLibre-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/AbhayaLibre-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/AbhayaLibre-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/AbhayaLibre-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--abhayali-font',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "Large",
    template: "%s | Large",
  },
  description: "Create and publish your own Posts with Large",
  openGraph: {
    type: "website",
    siteName: "Large",
    description: "Create and publish your own Posts with Large",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${abhayaliFont.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
