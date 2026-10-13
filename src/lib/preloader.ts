/**
 * Pure helpers for the DELTACHEM cinematic preloader.
 * Kept free of DOM / React so they can be unit-tested in isolation.
 */

/** Minimum time the preloader is shown so the choreography can breathe. */
export const PRELOADER_MIN_MS = 3400;
/** Shortened duration used for visitors who prefer reduced motion. */
export const PRELOADER_REDUCED_MS = 900;
/** While the page is still loading, progress parks here instead of hitting 100. */
export const PRELOADER_PENDING_CAP = 92;
/** If the page never reports ready (stalled font / asset), finish anyway. */
export const PRELOADER_FAILSAFE_MS = 7000;
/** sessionStorage flag: production visitors only see the intro once per session. */
export const PRELOADER_SESSION_KEY = 'dc_preloader_seen';

export interface PreloaderStatus {
  en: string;
  ar: string;
}

export const PRELOADER_STATUSES: readonly PreloaderStatus[] = [
  { en: 'Sourcing global APIs', ar: 'توريد المواد الفعالة العالمية' },
  { en: 'Verifying GMP certificates', ar: 'التحقق من شهادات GMP' },
  { en: 'Calibrating cold chain', ar: 'ضبط سلسلة التبريد' },
  { en: 'Syncing Cairo warehouse', ar: 'مزامنة مستودع القاهرة' },
  { en: 'Ready for dispatch', ar: 'جاهز للتوزيع' },
];

/**
 * Inline script (runs before hydration) that marks <html> when the intro was
 * already seen this session, so returning visitors never see a flash of it.
 * `?preloader` in the URL forces the intro to play again.
 */
export const PRELOADER_BOOT_SCRIPT = `try{if(location.search.indexOf('preloader')===-1&&sessionStorage.getItem('${PRELOADER_SESSION_KEY}')==='1'){document.documentElement.setAttribute('data-preloader','skip')}}catch(e){}`;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function easeInOutCubic(t: number): number {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

/**
 * Where progress *wants* to be at a given moment (0-100).
 * Follows an ease curve over `minMs`, but is capped until the page is ready so
 * the bar is honest about real loading.
 */
export function computeTargetProgress(
  elapsedMs: number,
  ready: boolean,
  minMs: number = PRELOADER_MIN_MS,
): number {
  const eased = easeInOutCubic(elapsedMs / minMs) * 100;
  const cap = ready ? 100 : PRELOADER_PENDING_CAP;
  return clamp(Math.min(eased, cap), 0, 100);
}

/**
 * Frame-rate independent smoothing toward `target`. Never moves backwards and
 * never overshoots; snaps onto the target when it is within a hair.
 */
export function smoothProgress(current: number, target: number, dtMs: number): number {
  if (target <= current) return current;
  const alpha = 1 - Math.exp(-Math.max(0, dtMs) / 140);
  const next = current + (target - current) * alpha;
  return target - next < 0.05 ? target : next;
}

/** Zero-padded 3 digit counter, e.g. 7 -> "007". */
export function formatCounter(progress: number): string {
  return String(Math.round(clamp(progress, 0, 100))).padStart(3, '0');
}

/** Which status line to show for the current progress. */
export function statusIndexFor(progress: number, count: number): number {
  if (count <= 0) return 0;
  const idx = Math.floor((clamp(progress, 0, 100) / 100) * count);
  return Math.min(count - 1, idx);
}

/* -------------------------------------------------------------------------- */
/* Ring geometry around the logo (SVG user units, viewBox 0 0 400 410)       */
/* -------------------------------------------------------------------------- */

export const DELTA_VIEWBOX = { width: 400, height: 410 } as const;
export const DELTA_CENTER = { x: 200, y: 205 } as const;

/** Points string for a regular hexagon (benzene ring), apex pointing up. */
export function hexagonPoints(cx: number, cy: number, radius: number): string {
  return Array.from({ length: 6 }, (_, k) => {
    const angle = (-90 + 60 * k) * (Math.PI / 180);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
}
