import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import About from './About';
import { renderWithTheme } from '../../test/renderWithTheme';

// Mock the image import
vi.mock('../../assets/edu1.png', () => ({ default: 'edu1.png' }));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('About', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ content: [] }),
    });
    renderWithTheme(<About />);
    expect(screen.getByText('Sobre Mim')).toBeInTheDocument();
  });

  it('renders photo with alt text', () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ content: [] }),
    });
    renderWithTheme(<About />);
    expect(screen.getByAltText('Eduardo Stanisci')).toBeInTheDocument();
  });

  it('renders paragraphs from API response', async () => {
    const years = new Date().getFullYear() - 2015;
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          content: [`Eduardo tem {0} anos de experiência.`, 'Texto de segundo parágrafo.'],
        }),
    });
    renderWithTheme(<About />);
    await waitFor(() => {
      expect(
        screen.getByText(`Eduardo tem ${years} anos de experiência.`)
      ).toBeInTheDocument();
      expect(screen.getByText('Texto de segundo parágrafo.')).toBeInTheDocument();
    });
  });

  it('shows fallback paragraphs on fetch error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderWithTheme(<About />);
    await waitFor(() => {
      expect(screen.getByText(/Eduardo Stanisci é desenvolvedor sênior/i)).toBeInTheDocument();
    });
  });

  it('renders location chip', () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ content: [] }),
    });
    renderWithTheme(<About />);
    expect(screen.getByText(/São Paulo/i)).toBeInTheDocument();
  });

  it('renders formation chip', () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ content: [] }),
    });
    renderWithTheme(<About />);
    expect(screen.getByText(/Senac/i)).toBeInTheDocument();
  });
});
