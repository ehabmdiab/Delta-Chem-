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
  dark: 'bg-gradient-to-r from-slate-950/92 via-slate-950/80 to-slate-950/55',
  forest: 'bg-gradient-to-r from-teal-950/92 via-teal-900/82 to-teal-800/60',
  navy: 'bg-gradient-to-r from-sky-950/92 via-sky-900/82 to-sky-800/60',
};

/**
 * Clean, airy section wrapper with generous whitespace.
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
          <div className="absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-teal-400/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-[24rem] w-[24rem] rounded-full bg-amber-500/5 blur-3xl" />
        </div>
      )}

      <div
        className={`relative mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
};
