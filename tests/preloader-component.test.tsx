import React from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { Preloader } from '@/components/preloader/Preloader';

describe('<Preloader />', () => {
  beforeEach(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
    document.documentElement.removeAttribute('data-preloader');
  });

  afterEach(() => {
    cleanup();
    document.documentElement.removeAttribute('data-preloader');
    document.documentElement.classList.remove('dc-pre-lock');
  });

  it('renders an accessible status overlay with the DELTACHEM logo', () => {
    const { getByRole, getByAltText } = render(<Preloader />);
    const status = getByRole('status');
    expect(status.getAttribute('aria-label')).toBe('Loading DELTACHEM');
    expect(status.getAttribute('aria-busy')).toBe('true');
    const logo = getByAltText('DELTACHEM');
    expect(logo.getAttribute('src')).toContain('logo-delta-chem');
  });

  it('locks page scroll while visible and releases it on unmount', () => {
    const { unmount } = render(<Preloader />);
    expect(document.documentElement.classList.contains('dc-pre-lock')).toBe(true);
    unmount();
    expect(document.documentElement.classList.contains('dc-pre-lock')).toBe(false);
  });

  it('renders nothing when the intro was already seen this session', () => {
    document.documentElement.setAttribute('data-preloader', 'skip');
    const { container } = render(<Preloader />);
    expect(container.querySelector('.dc-pre')).toBeNull();
    expect(document.documentElement.classList.contains('dc-pre-lock')).toBe(false);
  });

  it('stacks ghost, colour-fill and flash copies of the logo', () => {
    const { container } = render(<Preloader />);
    expect(container.querySelectorAll('.dc-pre__logo-img')).toHaveLength(3);
    expect(container.querySelector('.dc-pre__scan')).not.toBeNull();
  });

  it('renders the five curtain columns', () => {
    const { container } = render(<Preloader />);
    expect(container.querySelectorAll('.dc-pre__col')).toHaveLength(5);
  });
});
