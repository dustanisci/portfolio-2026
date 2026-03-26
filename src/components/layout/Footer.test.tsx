import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import Footer from './Footer';
import { renderWithTheme } from '../../test/renderWithTheme';

describe('Footer', () => {
  it('renders name', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText('Eduardo Stanisci')).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    renderWithTheme(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders LinkedIn link', () => {
    renderWithTheme(<Footer />);
    const link = screen.getByLabelText('LinkedIn de Eduardo Stanisci');
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/dustanisci/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders GitHub link', () => {
    renderWithTheme(<Footer />);
    const link = screen.getByLabelText('GitHub de Eduardo Stanisci');
    expect(link).toHaveAttribute('href', 'https://github.com/dustanisci');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders all rights reserved text', () => {
    renderWithTheme(<Footer />);
    expect(screen.getByText(/Todos os direitos reservados/i)).toBeInTheDocument();
  });
});
