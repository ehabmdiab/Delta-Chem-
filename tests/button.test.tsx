/** @vitest-environment jsdom */
import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button inline icon and text layout', () => {
  afterEach(() => {
    cleanup();
  });

  it('keeps children as direct flex items of <button> without an inline span wrapper', () => {
    render(
      <Button>
        <span>Inquire on Local Stock</span>
        <svg data-testid="arrow-icon" viewBox="0 0 24 24" />
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Inquire on Local Stock' });
    expect(button.className).toContain('inline-flex');
    expect(button.className).toContain('items-center');
    expect(button.className).toContain('[&_svg]:shrink-0');

    const icon = screen.getByTestId('arrow-icon');
    expect(icon.parentElement).toBe(button);
    expect(screen.getByText('Inquire on Local Stock').parentElement).toBe(button);
  });

  it('renders leftIcon and rightIcon inside inline-flex shrink-0 spans', () => {
    render(
      <Button
        leftIcon={<svg data-testid="left-icon" viewBox="0 0 24 24" />}
        rightIcon={<svg data-testid="right-icon" viewBox="0 0 24 24" />}
      >
        Visit Harvest Pharma
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Visit Harvest Pharma' });
    const leftWrapper = screen.getByTestId('left-icon').parentElement;
    const rightWrapper = screen.getByTestId('right-icon').parentElement;

    expect(leftWrapper?.tagName).toBe('SPAN');
    expect(leftWrapper?.parentElement).toBe(button);
    expect(leftWrapper?.className).toContain('inline-flex');
    expect(leftWrapper?.className).toContain('shrink-0');
    expect(leftWrapper?.className).toContain('items-center');

    expect(rightWrapper?.tagName).toBe('SPAN');
    expect(rightWrapper?.parentElement).toBe(button);
    expect(rightWrapper?.className).toContain('inline-flex');
    expect(rightWrapper?.className).toContain('shrink-0');
    expect(rightWrapper?.className).toContain('items-center');
  });

  it('disables the button, hides side icons, and shows loading spinner when isLoading is true', () => {
    const { container } = render(
      <Button
        isLoading
        leftIcon={<svg data-testid="left-icon" viewBox="0 0 24 24" />}
        rightIcon={<svg data-testid="right-icon" viewBox="0 0 24 24" />}
      >
        Submitting
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Submitting' }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(screen.queryByTestId('left-icon')).toBeNull();
    expect(screen.queryByTestId('right-icon')).toBeNull();

    const spinner = container.querySelector('svg.animate-spin');
    expect(spinner).not.toBeNull();
    expect(spinner?.parentElement).toBe(button);
  });
});

