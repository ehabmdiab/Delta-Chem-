/**
 * Base path the site is served under. Empty everywhere except the GitHub
 * Pages build, where the site lives at https://<user>.github.io/<repo>/.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * Prefix a root-relative URL with the deployment base path.
 * Needed for raw `<a href>`, `window.location` and other places that
 * `next/link` / `next/image` do not rewrite automatically.
 */
export function withBasePath(path: string, basePath: string = BASE_PATH): string {
  if (!basePath || !path.startsWith('/') || path.startsWith('//')) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
