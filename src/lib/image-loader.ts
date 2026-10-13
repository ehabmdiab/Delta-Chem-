import { withBasePath } from '@/lib/paths';

/**
 * Custom next/image loader for the static GitHub Pages export.
 * Static export has no image optimiser, and the built-in `unoptimized` mode
 * does not prepend the base path, so local images are prefixed here.
 */
export default function imageLoader({ src }: { src: string; width: number; quality?: number }): string {
  return withBasePath(src);
}
