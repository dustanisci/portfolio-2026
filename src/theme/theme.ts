import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      hero: string;
      card: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary?: string;
      hero?: string;
      card?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5',
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7C3AED',
      light: '#A78BFA',
      dark: '#5B21B6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F8F7F4',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#4B5563',
    },
    divider: 'rgba(79,70,229,0.12)',
    gradient: {
      primary: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
      hero: 'linear-gradient(180deg, #F8F7F4 0%, #EEF2FF 100%)',
      card: 'linear-gradient(135deg, rgba(79,70,229,0.04) 0%, rgba(124,58,237,0.04) 100%)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.75,
    },
    body2: {
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollBehavior: 'smooth',
        },
        '::-webkit-scrollbar': {
          width: '6px',
        },
        '::-webkit-scrollbar-track': {
          background: '#EEF2FF',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(180deg, #4F46E5, #7C3AED)',
          borderRadius: '3px',
        },
        '::selection': {
          background: 'rgba(79,70,229,0.18)',
          color: '#1A1A2E',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 28px',
          fontSize: '0.95rem',
        },
        contained: {
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          color: '#ffffff',
          fontWeight: 700,
          boxShadow: '0 4px 20px rgba(79,70,229,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #6366F1 0%, #9333EA 100%)',
            boxShadow: '0 6px 30px rgba(79,70,229,0.45)',
          },
        },
        outlined: {
          borderColor: 'rgba(79,70,229,0.5)',
          color: '#4F46E5',
          '&:hover': {
            borderColor: '#4F46E5',
            background: 'rgba(79,70,229,0.06)',
            boxShadow: '0 0 12px rgba(79,70,229,0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '0.8rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#FFFFFF',
          border: '1px solid rgba(79,70,229,0.1)',
          boxShadow: '0 2px 12px rgba(79,70,229,0.06)',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            borderColor: 'rgba(79,70,229,0.35)',
            boxShadow: '0 12px 40px rgba(79,70,229,0.16), 0 4px 16px rgba(0,0,0,0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.9rem',
        },
      },
    },
  },
});

export default theme;
