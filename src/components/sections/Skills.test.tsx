import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import Skills from './Skills';
import { renderWithTheme } from '../../test/renderWithTheme';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockSkillsData = {
  skills: [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Vue'] },
    { title: 'Backend', items: ['Node.js', 'Python'] },
  ],
};

describe('Skills', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders section title', () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
  });

  it('shows loading spinner initially', () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders skill categories after fetch', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    await waitFor(() => {
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
    });
  });

  it('renders skill chips after fetch', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));
    renderWithTheme(<Skills />);
    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('filters skills by search query', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    await waitFor(() => screen.getByText('React'));

    const searchInput = screen.getByPlaceholderText(/buscar habilidade/i);
    fireEvent.change(searchInput, { target: { value: 'react' } });

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    });
  });

  it('hides category entirely when no items match search', async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve(mockSkillsData) });
    renderWithTheme(<Skills />);
    await waitFor(() => screen.getByText('React'));

    const searchInput = screen.getByPlaceholderText(/buscar habilidade/i);
    fireEvent.change(searchInput, { target: { value: 'xxxxxx' } });

    await waitFor(() => {
      expect(screen.queryByText('React')).not.toBeInTheDocument();
      expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
    });
  });
});
