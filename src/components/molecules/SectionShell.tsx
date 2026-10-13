import React from 'react';
import Image from 'next/image';

export type SectionTone = 'light' | 'tint' | 'dark' | 'forest' | 'navy';

interface SectionShellProps {
  id?: string;
  /** Short name shown in the section rail */
  label: string;
  tone?: SectionTone;
  /** Optional full-bleed photo background (path under /public) */
  image?: string;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

const TONE_BASE: Record<SectionTone, string> = {
  light: 'bg-white text-slate-900',
  tint: 'bg-teal-50 text-slate-900',
  dark: 'bg-slate-950 text-white',
  forest: 'bg-teal-900 text-white',
  navy: 'bg-sky-950 text-white',
};

const TONE_OVERLAY: Record<SectionTone, string> = {
  light: 'bg-white/92',
  tint: 'bg-teal-50/92',
  dark: 'bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50',
  forest: 'bg-gradient-to-r from-teal-950/95 via-teal-900/85 to-teal-800/55',
  navy: 'bg-gradient-to-r from-sky-950/95 via-sky-900/85 to-sky-800/55',
};

/**
 * One full-screen "slide" of the page carousel.
 * Server-compatible - the snapping itself is handled by CSS (see globals.css)
 * and <SnapMode /> which toggles it per route.
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  id,
  label,
  tone = 'light',
  image,
  className = '',
  innerClassName = '',
  children,
}) => {
  const isDarkTone = tone === 'dark' || tone === 'forest' || tone === 'navy';

  return (
    <section
      id={id}
      data-snap
      data-snap-label={label}
      className={`relative isolate overflow-hidden ${TONE_BASE[tone]} ${className}`}
    >
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
          <div className={`absolute inset-0 ${TONE_OVERLAY[tone]}`} />
        </div>
      )}

      {isDarkTone && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-3xl"
          />
          <div
            className="absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-amber-500/5 blur-3xl"
          />
        </div>
      )}

      <div
        className={`relative my-auto mx-auto w-full max-w-[1720px] px-4 py-6 sm:px-8 sm:py-8 lg:px-14 lg:py-8 xl:px-20 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
