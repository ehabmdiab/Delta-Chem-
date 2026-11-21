/** @vitest-environment jsdom */
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Navbar } from '@/components/organisms/Navbar';
import { Footer } from '@/components/organisms/Footer';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

vi.mock('next/image', () => ({
  default: ({
    priority: _priority,
    fetchPriority: _fetchPriority,
    src,
    alt = '',
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    priority?: boolean;
    fetchPriority?: string;
  }) => {
    void _priority;
    void _fetchPriority;
    return React.createElement('img', {
      src: typeof src === 'string' ? src : '',
      alt,
      ...props,
    });
  },
}));

describe('Navbar and Footer navigation links', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn((query: string): MediaQueryList => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(() => false),
      })),
    });

    HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
    HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders /insights and Supply Chain links in desktop Navbar and mobile drawer', () => {
    render(<Navbar />);

    const desktopInsightsLink = screen.getByRole('link', { name: 'Insights' });
    expect(desktopInsightsLink.getAttribute('href')).toBe('/insights');

    const desktopSupplyChainLink = screen.getByRole('link', { name: 'Supply Chain' });
    expect(desktopSupplyChainLink.getAttribute('href')).toBe('/supply-chain');

    const toggleButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
    fireEvent.click(toggleButton);

    const mobileInsightsLink = screen.getByRole('link', { name: 'News & Insights' });
    expect(mobileInsightsLink.getAttribute('href')).toBe('/insights');

    const supplyChainLinks = screen.getAllByRole('link', { name: 'Supply Chain' });
    expect(supplyChainLinks).toHaveLength(2);
    for (const link of supplyChainLinks) {
      expect(link.getAttribute('href')).toBe('/supply-chain');
    }
  });

  it('renders /insights and Supply Chain links alongside /request-a-quote in Footer', () => {
    render(<Footer />);

    const supplyChainLink = screen.getByRole('link', { name: 'Supply Chain' });
    expect(supplyChainLink.getAttribute('href')).toBe('/supply-chain');

    const insightsLink = screen.getByRole('link', { name: 'News & Insights' });
    expect(insightsLink.getAttribute('href')).toBe('/insights');

    const rfqLink = screen.getByRole('link', { name: 'Request a Quote' });
    expect(rfqLink.getAttribute('href')).toBe('/request-a-quote');
  });
});

