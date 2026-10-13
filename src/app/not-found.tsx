'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { LanguageProvider, useLanguage } from '@/components/providers/LanguageContext';
import { Home, Package } from 'lucide-react';

function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-6xl font-extrabold text-teal-400 font-mono">404</span>
        <h1 className="text-2xl font-bold text-white">
          {t('Page Not Found', 'الصفحة غير موجودة')}
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          {t(
            'The requested chemical monograph or page does not exist or may have been relocated.',
            'الصفحة أو الملف الكيميائي المطلوب غير موجود أو ربما تم نقله إلى مسار آخر.'
          )}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="teal" size="md" leftIcon={<Home className="w-4 h-4" />}>
              {t('Return Home', 'العودة للرئيسية')}
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="outline"
              size="md"
              className="border-white/30 text-white hover:bg-white/10"
              leftIcon={<Package className="w-4 h-4" />}
            >
              {t('Browse Catalog', 'تصفح الكتالوج')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <LanguageProvider>
      <NotFoundContent />
    </LanguageProvider>
  );
}
