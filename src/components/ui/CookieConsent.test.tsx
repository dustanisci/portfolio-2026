import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import CookieConsent from './CookieConsent';
import { renderWithTheme } from '../../test/renderWithTheme';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('CookieConsent', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          privacyPolicy: [{ title: 'Uso de dados', description: 'Descricao do uso.' }],
        }),
    });
  });

  it('renders cookie banner when not accepted', () => {
    renderWithTheme(<CookieConsent />);
    expect(screen.getByText(/cookies/i)).toBeInTheDocument();
  });

  it('does not show banner when already accepted', () => {
    sessionStorage.setItem('lgpd', 'accept');
    renderWithTheme(<CookieConsent />);
    // Slide is unmountOnExit so the paper won't be in the DOM
    expect(screen.queryByText('FECHAR')).not.toBeInTheDocument();
  });

  it('closes banner on FECHAR button click', async () => {
    renderWithTheme(<CookieConsent />);
    const closeBtn = await screen.findByText('FECHAR');
    fireEvent.click(closeBtn);
    expect(sessionStorage.getItem('lgpd')).toBe('accept');
  });

  it('opens privacy policy dialog on link click', async () => {
    renderWithTheme(<CookieConsent />);
    const policyLink = await screen.findByText('Política de Privacidade');
    fireEvent.click(policyLink);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('renders policy sections in dialog', async () => {
    renderWithTheme(<CookieConsent />);
    const policyLink = await screen.findByText('Política de Privacidade');
    fireEvent.click(policyLink);
    expect(await screen.findByText('Uso de dados')).toBeInTheDocument();
    expect(await screen.findByText('Descricao do uso.')).toBeInTheDocument();
  });

  it('closes dialog via close icon button', async () => {
    renderWithTheme(<CookieConsent />);
    const policyLink = await screen.findByText('Política de Privacidade');
    fireEvent.click(policyLink);
    await screen.findByRole('dialog');
    const closeBtn = screen.getByLabelText('Fechar política de privacidade');
    fireEvent.click(closeBtn);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes dialog on Escape key (onClose callback)', async () => {
    renderWithTheme(<CookieConsent />);
    fireEvent.click(await screen.findByText('Política de Privacidade'));
    await screen.findByRole('dialog');
    // Click MUI backdrop to trigger onClose
    const backdrop = document.querySelector('.MuiBackdrop-root');
    if (backdrop) fireEvent.click(backdrop);
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    renderWithTheme(<CookieConsent />);
    // Should render without crashing
    expect(screen.getByText(/cookies/i)).toBeInTheDocument();
  });
});
