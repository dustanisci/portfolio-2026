import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import Education from './Education';
import { renderWithTheme } from '../../test/renderWithTheme';

// Mock gsap
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

vi.mock('react-intersection-observer', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useInView: vi.fn().mockReturnValue({ ref: vi.fn(), inView: false } as any),
}));

describe('Education', () => {
  it('renders section title', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText('Formação')).toBeInTheDocument();
  });

  it('renders Senac card', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText('Senac São Paulo')).toBeInTheDocument();
  });

  it('renders degree name', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText('Análise e Desenvolvimento de Sistemas')).toBeInTheDocument();
  });

  it('renders continuous education card', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText('Cursos Técnicos e Online')).toBeInTheDocument();
  });

  it('renders period chips', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText('2014 — 2016')).toBeInTheDocument();
    expect(screen.getByText('2016 — Presente')).toBeInTheDocument();
  });

  it('renders descriptions', () => {
    renderWithTheme(<Education />);
    expect(screen.getByText(/banco de dados/i)).toBeInTheDocument();
    expect(screen.getByText(/Clean Architecture/i)).toBeInTheDocument();
  });

  it('renders with inView true (animate branch)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useInView).mockReturnValue({ ref: vi.fn(), inView: true } as any);
    renderWithTheme(<Education />);
    expect(screen.getByText('Formação')).toBeInTheDocument();
  });
});
