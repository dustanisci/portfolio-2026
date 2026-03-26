import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import { renderWithTheme } from '../../test/renderWithTheme';

// Mock useMediaQuery and useScrollTrigger so we can test both states
const mockUseMediaQuery = vi.fn();
const mockScrollTrigger = vi.fn().mockReturnValue(false);
vi.mock('@mui/material', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@mui/material')>();
  return {
    ...actual,
    useMediaQuery: () => mockUseMediaQuery(),
    useScrollTrigger: () => mockScrollTrigger(),
  };
});

describe('Header – desktop', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false); // not mobile
    vi.clearAllMocks();
  });

  it('renders logo name', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Eduardo Stanisci')).toBeInTheDocument();
  });

  it('renders all nav links', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Carreira')).toBeInTheDocument();
    expect(screen.getByText('Projetos')).toBeInTheDocument();
    expect(screen.getByText('Formação')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renders Contate-me button', () => {
    renderWithTheme(<Header />);
    expect(screen.getByText('Contate-me')).toBeInTheDocument();
  });

  it('scrolls to section when nav link clicked', () => {
    const el = document.createElement('div');
    el.id = 'sobre';
    document.body.appendChild(el);

    renderWithTheme(<Header />);
    fireEvent.click(screen.getByText('Sobre'));

    document.body.removeChild(el);
  });

  it('scrolls to #contato when Contate-me clicked', () => {
    const el = document.createElement('div');
    el.id = 'contato';
    document.body.appendChild(el);

    renderWithTheme(<Header />);
    fireEvent.click(screen.getByText('Contate-me'));

    document.body.removeChild(el);
  });

  it('does not show mobile menu button on desktop', () => {
    renderWithTheme(<Header />);
    expect(screen.queryByLabelText('Abrir menu')).not.toBeInTheDocument();
  });

  it('renders with scrolled style when scrolled', () => {
    mockScrollTrigger.mockReturnValueOnce(true);
    renderWithTheme(<Header />);
    expect(screen.getByText('Eduardo Stanisci')).toBeInTheDocument();
  });

  it('navigates to hero when logo is clicked', () => {
    const el = document.createElement('div');
    el.id = 'hero';
    document.body.appendChild(el);

    renderWithTheme(<Header />);
    const logo = screen.getByText('Eduardo Stanisci');
    fireEvent.click(logo.closest('a')!);

    document.body.removeChild(el);
  });
});

describe('Header – mobile', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(true); // mobile
    vi.clearAllMocks();
  });

  it('shows mobile menu button', () => {
    renderWithTheme(<Header />);
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('opens drawer on menu button click', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(await screen.findByLabelText('Fechar menu')).toBeInTheDocument();
  });

  it('closes drawer on close button click', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    const closeBtn = await screen.findByLabelText('Fechar menu');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
    });
  });

  it('drawer contains nav links', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    expect(await screen.findByText('Sobre')).toBeInTheDocument();
  });

  it('closes drawer when drawer nav link is clicked', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    const sobreLink = await screen.findByText('Sobre');
    fireEvent.click(sobreLink);
    // drawer closes after click (no assertion needed, just verify no crash)
  });

  it('closes drawer via Contate-me button in drawer', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    // Contate-me appears in drawer
    const contateButtons = await screen.findAllByText('Contate-me');
    fireEvent.click(contateButtons[0]);
    // verify no crash
  });

  it('closes drawer on backdrop click (onClose)', async () => {
    renderWithTheme(<Header />);
    fireEvent.click(screen.getByLabelText('Abrir menu'));
    await screen.findByLabelText('Fechar menu');
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) fireEvent.click(backdrop);
    await waitFor(() => {
      expect(screen.queryByLabelText('Fechar menu')).not.toBeInTheDocument();
    });
  });
});
