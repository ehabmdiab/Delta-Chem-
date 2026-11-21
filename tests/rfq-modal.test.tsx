/** @vitest-environment jsdom */
import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { RfqModal } from '@/components/molecules/RfqModal';

describe('RfqModal native dialog accessibility and behavior', () => {
  let showModalSpy: ReturnType<typeof vi.fn<() => void>>;
  let closeSpy: ReturnType<typeof vi.fn<() => void>>;

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

    showModalSpy = vi.fn(function (this: HTMLDialogElement) {
      this.open = true;
    });
    closeSpy = vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
    });

    HTMLDialogElement.prototype.showModal = showModalSpy;
    HTMLDialogElement.prototype.close = closeSpy;
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renders a native <dialog> without redundant role or aria-modal and wires aria-labelledby', () => {
    render(<RfqModal isOpen onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog.tagName).toBe('DIALOG');
    expect(dialog.hasAttribute('role')).toBe(false);
    expect(dialog.hasAttribute('aria-modal')).toBe(false);
    expect(dialog.getAttribute('closedby')).toBe('any');

    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    const heading = document.getElementById(labelledBy as string);
    expect(heading?.tagName).toBe('H3');
    expect(heading?.textContent).toContain('Request for Quotation (RFQ)');
    expect(showModalSpy).toHaveBeenCalledTimes(1);
  });

  it('prefills product name from prefilledProduct and notifies onClose on close actions', () => {
    const onClose = vi.fn();
    render(
      <RfqModal
        isOpen
        onClose={onClose}
        prefilledProduct={{ id: 'prod-1', name: 'Ascorbic Acid (Vitamin C)', grade: 'BP / USP' }}
      />
    );

    const productInput = screen.getByPlaceholderText(
      'e.g. Amoxicillin Trihydrate, MCC PH 101'
    ) as HTMLInputElement;
    expect(productInput.value).toBe('Ascorbic Acid (Vitamin C)');

    const dialog = screen.getByRole('dialog');
    const closeButton = screen.getByRole('button', { name: 'Close dialog' });
    fireEvent.click(closeButton);

    expect(closeSpy).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent(dialog, new Event('close'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});

