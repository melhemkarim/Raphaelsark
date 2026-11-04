import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ToastProvider } from "@/components/Toast";
import ScrollProgress from "@/components/ScrollProgress";
// @ts-ignore - Next.js provides CSS module declarations through its generated types.
import "./globals.css";

export const metadata: Metadata = {
  title: "Raphael Sark",
  description:
    "Lebanese comedy about moms, school, generators and everything else Lebanon puts you through. An unofficial concept site by Linky.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD21F" },
    { media: "(prefers-color-scheme: dark)", color: "#17142B" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Rubik:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ToastProvider>
          <ScrollProgress />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
