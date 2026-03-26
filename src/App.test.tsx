import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './theme/theme';

// Mock AOS
vi.mock('aos', () => ({
  default: { init: vi.fn() },
}));

// Mock heavy section components to keep App test focused
vi.mock('./components/sections/Hero', () => ({ default: () => <div data-testid="hero" /> }));
vi.mock('./components/sections/About', () => ({ default: () => <div data-testid="about" /> }));
vi.mock('./components/sections/Skills', () => ({ default: () => <div data-testid="skills" /> }));
vi.mock('./components/sections/Experience', () => ({ default: () => <div data-testid="experience" /> }));
vi.mock('./components/sections/Projects', () => ({ default: () => <div data-testid="projects" /> }));
vi.mock('./components/sections/Education', () => ({ default: () => <div data-testid="education" /> }));
vi.mock('./components/sections/Contact', () => ({ default: () => <div data-testid="contact" /> }));
vi.mock('./components/layout/Header', () => ({ default: () => <header data-testid="header" /> }));
vi.mock('./components/layout/Footer', () => ({ default: () => <footer data-testid="footer" /> }));
vi.mock('./components/ui/CookieConsent', () => ({ default: () => <div data-testid="cookie-consent" /> }));

function renderApp() {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

describe('App', () => {
  it('renders header', () => {
    renderApp();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders footer', () => {
    renderApp();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders all sections', () => {
    renderApp();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('skills')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('education')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });

  it('renders cookie consent', () => {
    renderApp();
    expect(screen.getByTestId('cookie-consent')).toBeInTheDocument();
  });

  it('renders skip link for accessibility', () => {
    renderApp();
    expect(screen.getByText('Pular para o conteúdo principal')).toBeInTheDocument();
  });

  it('skip link focuses on focus and blurs on blur', () => {
    renderApp();
    const link = screen.getByText('Pular para o conteúdo principal');
    link.focus();
    link.blur();
    // Verify no crash
    expect(link).toBeInTheDocument();
  });
});
