import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

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
      <body className={`${abhayaliFont.className}`}>
        {children}
      </body>
    </html>
  );
}
