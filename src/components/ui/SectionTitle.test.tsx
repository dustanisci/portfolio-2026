import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';
import SectionTitle from './SectionTitle';
import { renderWithTheme } from '../../test/renderWithTheme';

vi.mock('react-intersection-observer', () => ({
  useInView: vi.fn().mockReturnValue({ ref: vi.fn(), inView: false, entry: undefined }),
}));

describe('SectionTitle', () => {
  it('renders title text', () => {
    renderWithTheme(<SectionTitle title="Sobre Mim" />);
    expect(screen.getByText('Sobre Mim')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    renderWithTheme(<SectionTitle title="Sobre Mim" subtitle="Quem sou eu" />);
    expect(screen.getByText('Quem sou eu')).toBeInTheDocument();
  });

  it('does not crash without subtitle', () => {
    renderWithTheme(<SectionTitle title="Título" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  it('renders with align left', () => {
    renderWithTheme(<SectionTitle title="Título" align="left" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  it('renders with align center (default)', () => {
    renderWithTheme(<SectionTitle title="Título" align="center" />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });

  it('renders with inView true (animate branch)', () => {
    vi.mocked(useInView).mockReturnValueOnce({ ref: vi.fn(), inView: true, entry: undefined });
    renderWithTheme(<SectionTitle title="Animado" />);
    expect(screen.getByText('Animado')).toBeInTheDocument();
  });
});
