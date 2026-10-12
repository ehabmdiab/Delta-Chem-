import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DELTACHEM | Premium B2B Pharmaceutical & Healthcare Ingredients Supplier",
  description: "Premier B2B supplier and distributor of Active Pharmaceutical Ingredients (APIs), excipients, nutraceutical, veterinary, and cosmeceutical raw materials in Egypt and MENA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-teal-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
