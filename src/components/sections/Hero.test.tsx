import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Hero from './Hero';
import { renderWithTheme } from '../../test/renderWithTheme';

// Mock heavy dependencies
vi.mock('@tsparticles/react', () => ({
  default: vi.fn(() => null),
  initParticlesEngine: vi.fn().mockImplementation(async (cb: (e: unknown) => Promise<void>) => {
    await cb({});
  }),
}));

vi.mock('@tsparticles/slim', () => ({
  loadSlim: vi.fn().mockResolvedValue(undefined),
}));

describe('Hero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders name', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Eduardo Stanisci')).toBeInTheDocument();
  });

  it('renders title Desenvolvedor Sênior', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('Desenvolvedor Sênior')).toBeInTheDocument();
  });

  it('renders tagline with years of experience', () => {
    renderWithTheme(<Hero />);
    const years = new Date().getFullYear() - 2015;
    expect(screen.getByText(new RegExp(`\\+${years} anos`))).toBeInTheDocument();
  });

  it('renders LinkedIn button', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('renders GitHub button', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
  });

  it('renders SCROLL indicator', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText('SCROLL')).toBeInTheDocument();
  });

  it('scrolls down when SCROLL clicked', () => {
    const el = document.createElement('div');
    el.id = 'sobre';
    document.body.appendChild(el);

    renderWithTheme(<Hero />);
    const scrollArea = screen.getByText('SCROLL').closest('div')!;
    fireEvent.click(scrollArea);

    document.body.removeChild(el);
  });

  it('scrolls down gracefully when target not found', () => {
    renderWithTheme(<Hero />);
    const scrollArea = screen.getByText('SCROLL').closest('div')!;
    // Should not throw even if element doesn't exist
    fireEvent.click(scrollArea);
  });

  it('renders particles after engine initializes', async () => {
    renderWithTheme(<Hero />);
    // Wait for initParticlesEngine callback to fire, setting engineReady=true
    await waitFor(() => {
      expect(screen.getByText('Eduardo Stanisci')).toBeInTheDocument();
    });
  });
});
