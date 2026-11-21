import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PRELOADER_BOOT_SCRIPT } from "@/lib/preloader";

const latinFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DELTACHEM | Pharmaceutical, Veterinary, Cosmetic & Nutraceutical Raw Materials",
  description:
    "Authorized importer and distributor of human pharmaceutical, veterinary, cosmetic, and nutraceutical raw materials in Egypt and MENA.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${latinFont.variable} ${arabicFont.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{".dc-pre{display:none!important}"}</style>
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
