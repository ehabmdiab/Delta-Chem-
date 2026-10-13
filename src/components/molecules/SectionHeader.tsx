import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Use on dark/forest/navy backgrounds */
  onDark?: boolean;
  align?: 'start' | 'center';
  className?: string;
  children?: React.ReactNode;
}

/** Arshine-style section title: tracked eyebrow with rule, big display heading, readable lead. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  onDark = false,
  align = 'start',
  className = '',
  children,
}) => (
  <div
    className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}
  >
    <span
      className={`inline-flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] ${
        onDark ? 'text-teal-400' : 'text-teal-600'
      }`}
    >
      <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-amber-500" />
      {eyebrow}
    </span>

    <h2
      className={`text-[clamp(1.75rem,3.1vw,3.25rem)] font-extrabold leading-[1.1] tracking-tight ${
        onDark ? 'text-white' : 'text-slate-900'
      }`}
    >
      {title}
    </h2>

    {description && (
      <p
        className={`max-w-3xl text-base leading-relaxed lg:text-lg ${
          onDark ? 'text-slate-300' : 'text-slate-600'
        }`}
      >
        {description}
      </p>
    )}

    {children}
  </div>
);
