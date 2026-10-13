'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useLanguage } from '@/components/providers/LanguageContext';

/** Routes where long-form reading / forms make full-screen snapping a poor fit. */
const SNAP_DISABLED_PREFIXES = ['/products', '/request-a-quote', '/insights/'];

const SECTION_LABEL_MAP: Record<string, string> = {
  Home: 'الرئيسية',
  About: 'عن الشركة',
  Products: 'المنتجات',
  Featured: 'المميزة',
  'Sourcing Models': 'نماذج التوريد',
  'Cairo Hub': 'مستودع القاهرة',
  Quality: 'الجودة والرقابة',
  Insights: 'المقالات والأخبار',
  Contact: 'اتصل بنا',
  Overview: 'نظرة عامة',
  Profile: 'الملف المؤسسي',
  Leadership: 'القيادة التنفيذية',
  'Harvest Hub': 'مستودع هارفست',
  Values: 'القيم والالتزام',
  'Dual Models': 'النماذج التجارية',
  Services: 'الخدمات',
  Standards: 'المعايير والرقابة',
  Documentation: 'الملفات الفنية',
  Testing: 'الفحص والتحليل',
  Auditing: 'التدقيق والتأهيل',
  Warehousing: 'التخزين واللوجستيات',
  Zones: 'مناطق التخزين',
  Fleet: 'أسطول التوزيع',
  SLA: 'مواعيد التسليم',
  Industries: 'القطاعات',
  Advantages: 'المزايا الاستراتيجية',
  Partners: 'الشركاء العالميون',
  Inquire: 'طلب الاستفسار',
  Location: 'المقر والعنوان',
};

interface RailItem {
  id: string;
  label: string;
}

const getTopLevelSections = (): HTMLElement[] =>
  Array.from(document.querySelectorAll<HTMLElement>('main section')).filter(
    (el) => el.parentElement?.closest('section') === null
  );

const labelFor = (el: HTMLElement, index: number): string => {
  const explicit = el.dataset.snapLabel ?? el.getAttribute('aria-label');
  if (explicit) return explicit;
  const heading = el.querySelector('h1, h2')?.textContent?.trim();
  if (heading) return heading.length > 34 ? `${heading.slice(0, 32)}…` : heading;
  return `Section ${index + 1}`;
};

/**
 * Turns every top-level <section> inside <main> into a full-screen "slide"
 * (Arshine style full-page carousel), and renders:
 *  - a vertical dot rail with labels for jumping between slides
 *  - a thin scroll progress bar
 * Also provides reduced-motion handling for all motion components.
 */
export const SnapMode: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const enabled = !SNAP_DISABLED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  const [items, setItems] = useState<RailItem[]>([]);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  // Toggle the snap behaviour on <html> for the lifetime of the page.
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('snap-root');
    }
    return () => root.classList.remove('snap-root');
  }, [enabled]);

  // Collect sections for the rail + track the active one.
  useEffect(() => {
    if (!enabled) return;

    let cancel = false;
    let removeScrollListener: (() => void) | null = null;

    const frame = requestAnimationFrame(() => {
      if (cancel) return;
      const sections = getTopLevelSections();
      sections.forEach((el, i) => {
        if (!el.id) el.id = `section-${i + 1}`;
      });
      setItems(sections.map((el, i) => ({ id: el.id, label: labelFor(el, i) })));

      let ticking = false;
      const updateActive = () => {
        const scrollY = window.scrollY;
        const probe = scrollY + window.innerHeight * 0.42;
        let currentIdx = 0;
        for (let i = 0; i < sections.length; i++) {
          const top = sections[i].offsetTop;
          const bottom = top + sections[i].offsetHeight;
          if (probe >= top && probe < bottom) {
            currentIdx = i;
            break;
          } else if (probe >= bottom) {
            currentIdx = i;
          }
        }
        setActive(currentIdx);
      };

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            updateActive();
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      updateActive();
      removeScrollListener = () => window.removeEventListener('scroll', handleScroll);
    });

    return () => {
      cancel = true;
      cancelAnimationFrame(frame);
      if (removeScrollListener) removeScrollListener();
    };
  }, [enabled, pathname]);

  const goTo = useCallback(
    (id: string) => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    },
    [reduceMotion]
  );

  const showRail = enabled && items.length > 1;

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-teal-400 via-teal-500 to-amber-500"
      />

      {children}

      {showRail && (
        <>
          {/* Right-hand slide rail with counter */}
          <nav
            aria-label={t('Page sections', 'أقسام الصفحة')}
            className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full bg-slate-950/75 px-2 py-3.5 shadow-xl backdrop-blur-md sm:flex lg:right-5 rtl:right-auto rtl:left-2 rtl:lg:left-5"
          >
            <div
              aria-label={t(`Slide ${active + 1} of ${items.length}`, `شريحة ${active + 1} من ${items.length}`)}
              className="mb-2 px-1 font-mono text-[10px] font-extrabold text-teal-400"
            >
              <span>{String(active + 1).padStart(2, '0')}</span>
              <span className="mx-0.5 opacity-40">/</span>
              <span className="text-white/60">{String(items.length).padStart(2, '0')}</span>
            </div>
            {items.map((item, index) => {
              const isActive = index === active;
              const localizedLabel = t(item.label, SECTION_LABEL_MAP[item.label] || item.label);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(item.id)}
                  aria-label={localizedLabel}
                  aria-current={isActive ? 'true' : undefined}
                  className="group relative flex h-6 w-6 cursor-pointer items-center justify-center"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'h-3 w-3 bg-teal-400 ring-2 ring-teal-400/40'
                        : 'h-2 w-2 bg-white/50 group-hover:bg-white'
                    }`}
                  />
                  <span className="pointer-events-none absolute right-8 rtl:right-auto rtl:left-8 whitespace-nowrap rounded-md bg-slate-950/90 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {localizedLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </MotionConfig>
  );
};
