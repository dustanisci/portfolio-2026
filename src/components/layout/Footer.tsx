import { Box, Container, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: '#FFFFFF',
        borderTop: '1px solid rgba(79,70,229,0.1)',
        py: 5,
        mt: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 3,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
            <Typography
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.1rem',
              }}
            >
              Eduardo Stanisci
            </Typography>
          </Box>

          {/* Copyright */}
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
            &copy; {year} Eduardo Stanisci. Todos os direitos reservados.
          </Typography>

          {/* Social links */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              href="https://www.linkedin.com/in/dustanisci/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Eduardo Stanisci"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(79,70,229,0.2)',
                borderRadius: '8px',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  background: 'rgba(79,70,229,0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://github.com/dustanisci"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Eduardo Stanisci"
              sx={{
                color: 'text.secondary',
                border: '1px solid rgba(79,70,229,0.2)',
                borderRadius: '8px',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  background: 'rgba(79,70,229,0.08)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
