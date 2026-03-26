import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import Experience from './Experience';
import { renderWithTheme } from '../../test/renderWithTheme';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Experience', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve({ content: [] }) });
    renderWithTheme(<Experience />);
    expect(screen.getByText('Carreira')).toBeInTheDocument();
  });

  it('renders career paragraphs from API', async () => {
    const years = String(new Date().getFullYear() - 2015);
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          content: [`Desenvolvedor com {0} anos de experiência.`, 'Segundo parágrafo da carreira.'],
        }),
    });
    renderWithTheme(<Experience />);
    await waitFor(() => {
      expect(
        screen.getByText(`Desenvolvedor com ${years} anos de experiência.`)
      ).toBeInTheDocument();
      expect(screen.getByText('Segundo parágrafo da carreira.')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderWithTheme(<Experience />);
    // Should render without crashing - no paragraphs appear
    await waitFor(() => {
      expect(screen.getByText('Carreira')).toBeInTheDocument();
    });
  });
});
