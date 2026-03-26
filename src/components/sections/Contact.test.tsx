import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import Contact from './Contact';
import { renderWithTheme } from '../../test/renderWithTheme';

vi.mock('react-intersection-observer', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInView: vi.fn().mockReturnValue({ ref: vi.fn(), inView: false } as any),
}));

describe('Contact', () => {
  it('renders section title', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renders call to action heading', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText(/incrível/i)).toBeInTheDocument();
  });

  it('renders LinkedIn button with correct link', () => {
    renderWithTheme(<Contact />);
    const linkedInLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const hasCorrectHref = linkedInLinks.some(
      (link) => link.getAttribute('href') === 'https://www.linkedin.com/in/dustanisci/'
    );
    expect(hasCorrectHref).toBe(true);
  });

  it('renders GitHub button with correct link', () => {
    renderWithTheme(<Contact />);
    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    const hasCorrectHref = githubLinks.some(
      (link) => link.getAttribute('href') === 'https://github.com/dustanisci'
    );
    expect(hasCorrectHref).toBe(true);
  });

  it('renders location', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText(/soluções que resolvem problemas/i)).toBeInTheDocument();
  });

  it('renders contact cards with platform values', () => {
    renderWithTheme(<Contact />);
    expect(screen.getByText('/in/dustanisci')).toBeInTheDocument();
    expect(screen.getByText('github.com/dustanisci')).toBeInTheDocument();
  });

  it('renders with inView true (animate branches)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useInView).mockReturnValue({ ref: vi.fn(), inView: true } as any);
    renderWithTheme(<Contact />);
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });
});
