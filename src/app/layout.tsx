import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/providers";
import { NavToggle } from "@/components/nav-toggle";
import { ScrollingBanner } from "@/components/scrolling-banner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen font-sans antialiased`}
      >
        <Providers>
          <ScrollingBanner />
          <div className="flex min-h-screen justify-center px-6 py-10 sm:px-8 sm:py-16">
            <div className="w-full max-w-[520px]">
              <NavToggle />
              <div className="mt-6">
                {children}
              </div>
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
