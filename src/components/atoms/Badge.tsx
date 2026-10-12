import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'teal'
    | 'blue'
    | 'amber'
    | 'emerald'
    | 'outline'
    | 'slate'
    | 'info'
    | 'primary'
    | 'neutral'
    | 'success';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    neutral: 'bg-slate-100 text-slate-800 border border-slate-200',
    slate: 'bg-slate-800 text-slate-100 border border-slate-700',
    teal: 'bg-teal-50 text-teal-800 border border-teal-200',
    blue: 'bg-sky-50 text-sky-800 border border-sky-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
    primary: 'bg-blue-50 text-blue-800 border border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200',
    outline: 'bg-transparent text-slate-700 border border-slate-300',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const dotColors: Record<NonNullable<BadgeProps['variant']>, string> = {
    default: 'bg-slate-500',
    neutral: 'bg-slate-500',
    slate: 'bg-slate-300',
    teal: 'bg-teal-500',
    blue: 'bg-sky-500',
    info: 'bg-blue-500',
    primary: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    success: 'bg-emerald-500',
    amber: 'bg-amber-500',
    outline: 'bg-slate-400',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
