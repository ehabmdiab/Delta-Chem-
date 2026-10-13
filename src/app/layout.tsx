import type { Metadata, Viewport } from "next";
import { Manrope, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PRELOADER_BOOT_SCRIPT } from "@/lib/preloader";

const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const body = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DELTACHEM | Premium B2B Pharmaceutical & Healthcare Ingredients Supplier",
  description: "Premier B2B supplier and distributor of Active Pharmaceutical Ingredients (APIs), excipients, nutraceutical, veterinary, and cosmeceutical raw materials in Egypt and MENA.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#126537",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${heading.variable} ${body.variable} h-full antialiased`}>
      <head>
        <noscript>
          <style>{'.dc-pre{display:none!important}'}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white">
        <Script
          id="dc-preloader-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: PRELOADER_BOOT_SCRIPT }}
        />
        {children}
      </body>
    </html>
  );
}
