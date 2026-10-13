import { describe, it, expect } from 'vitest';
import { withBasePath } from '@/lib/paths';
import imageLoader from '@/lib/image-loader';

describe('withBasePath', () => {
  it('returns the path untouched when there is no base path', () => {
    expect(withBasePath('/products?search=x', '')).toBe('/products?search=x');
  });

  it('prefixes root-relative paths with the base path', () => {
    expect(withBasePath('/products?search=x', '/Delta-Chem-')).toBe('/Delta-Chem-/products?search=x');
    expect(withBasePath('/', '/Delta-Chem-')).toBe('/Delta-Chem-/');
  });

  it('does not double-prefix', () => {
    expect(withBasePath('/Delta-Chem-/about', '/Delta-Chem-')).toBe('/Delta-Chem-/about');
    expect(withBasePath('/Delta-Chem-', '/Delta-Chem-')).toBe('/Delta-Chem-');
  });

  it('leaves absolute, protocol-relative and relative URLs alone', () => {
    expect(withBasePath('https://example.com/a.png', '/b')).toBe('https://example.com/a.png');
    expect(withBasePath('//cdn.example.com/a.png', '/b')).toBe('//cdn.example.com/a.png');
    expect(withBasePath('images/a.png', '/b')).toBe('images/a.png');
  });
});

describe('static export image loader', () => {
  it('returns the src for local images when no base path is configured', () => {
    expect(imageLoader({ src: '/images/logo-delta-chem.png', width: 640 })).toBe('/images/logo-delta-chem.png');
  });

  it('leaves remote images untouched', () => {
    expect(imageLoader({ src: 'https://example.com/x.jpg', width: 640 })).toBe('https://example.com/x.jpg');
  });
});
