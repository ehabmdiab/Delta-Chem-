import React from 'react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';
import { LanguageProvider } from '@/components/providers/LanguageContext';
import { SnapMode } from '@/components/providers/SnapMode';
import { Preloader } from '@/components/preloader/Preloader';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <Preloader />
      <SnapMode>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </SnapMode>
    </LanguageProvider>
  );
}
