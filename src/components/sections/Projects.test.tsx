import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Projects from './Projects';
import { renderWithTheme } from '../../test/renderWithTheme';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockPortfolioData = {
  portfolio: [
    {
      id: 1,
      urlSite: 'https://example.com',
      galleries: [
        'https://raw.githubusercontent.com/dustanisci/backup/master/project-alpha/img1.png',
        'https://raw.githubusercontent.com/dustanisci/backup/master/project-alpha/img2.png',
      ],
    },
    {
      id: 2,
      urlSite: 'https://example2.com',
      galleries: [
        'https://raw.githubusercontent.com/dustanisci/backup/master/project-beta/img1.png',
      ],
    },
    {
      id: 3,
      urlSite: 'https://example3.com',
      galleries: [],
    },
    {
      id: 4,
      urlSite: 'https://example4.com',
      galleries: ['noslashes'],  // triggers parts[parts.length-2] ?? 'projeto' fallback
    },
  ],
};

describe('Projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    expect(screen.getByText('Projetos')).toBeInTheDocument();
  });

  it('renders project cards after fetch', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => {
      expect(screen.getByText('Project-alpha')).toBeInTheDocument();
      expect(screen.getByText('Project-beta')).toBeInTheDocument();
    });
  });

  it('renders fallback "Projeto" for empty galleries', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => {
      expect(screen.getAllByText('Projeto').length).toBeGreaterThan(0);
    });
  });

  it('opens gallery dialog on card click', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('shows image count in dialog', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    await screen.findByRole('dialog');
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('navigates to next image', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByLabelText('Próxima imagem'));
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('navigates to previous image (wraps around)', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByLabelText('Imagem anterior'));
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('navigates with ArrowRight key', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    const dialog = await screen.findByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('navigates with ArrowLeft key', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    const dialog = await screen.findByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('closes dialog on close button click', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByText('Project-alpha'));
    fireEvent.click(screen.getByText('Project-alpha'));
    await screen.findByRole('dialog');
    fireEvent.click(screen.getByLabelText('Fechar galeria'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('opens gallery via keyboard Enter on card', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByLabelText('Ver galeria de Project-alpha'));
    const card = screen.getByLabelText('Ver galeria de Project-alpha');
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('opens gallery via keyboard Space on card', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByLabelText('Ver galeria de Project-alpha'));
    const card = screen.getByLabelText('Ver galeria de Project-alpha');
    fireEvent.keyDown(card, { key: ' ' });
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderWithTheme(<Projects />);
    await waitFor(() => {
      expect(screen.getByText('Projetos')).toBeInTheDocument();
    });
  });

  it('hovering card changes hover state', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockPortfolioData) });
    renderWithTheme(<Projects />);
    await waitFor(() => screen.getByLabelText('Ver galeria de Project-alpha'));
    const card = screen.getByLabelText('Ver galeria de Project-alpha');
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    // No assertion needed – just verifying it doesn't throw
  });
});
