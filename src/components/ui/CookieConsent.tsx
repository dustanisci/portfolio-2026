import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Slide,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { IApiLgpdPolicy, IApiLgpdResponse } from '../../types';
import { Urls } from '../../data/portfolio';

const LGPD_KEY = 'lgpd';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [policy, setPolicy] = useState<IApiLgpdPolicy[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(LGPD_KEY) !== 'accept') {
      setVisible(true);
    }
    fetch(Urls.Lgpd)
      .then((r) => r.json() as Promise<IApiLgpdResponse>)
      .then((data) => setPolicy(data.privacyPolicy))
      .catch(() => {});
  }, []);

  function handleClose() {
    sessionStorage.setItem(LGPD_KEY, 'accept');
    setVisible(false);
  }

  return (
    <>
      <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        <Paper
          elevation={8}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1200,
            background: 'rgba(255,255,255,0.97)',
            borderTop: '1px solid rgba(79,70,229,0.12)',
            backdropFilter: 'blur(20px)',
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            sx={{
              maxWidth: 'lg',
              mx: 'auto',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              gap: { xs: 1.5, md: 3 },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ flex: 1, fontSize: { xs: '0.82rem', md: '0.88rem' }, lineHeight: 1.65 }}
            >
              Este site utiliza cookies e outras tecnologias semelhantes para melhorar a sua
              experiência. Ao utilizar este site, você concorda com tal monitoramento. Para mais
              informações consulte a nossa{' '}
              <Button
                variant="text"
                size="small"
                onClick={() => setDialogOpen(true)}
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: 'inherit',
                  p: 0,
                  minWidth: 0,
                  textDecoration: 'underline',
                  '&:hover': { background: 'transparent', color: 'primary.light' },
                  textTransform: 'none',
                  verticalAlign: 'baseline',
                }}
              >
                Política de Privacidade
              </Button>
              .
            </Typography>

            <Button
              variant="contained"
              size="small"
              onClick={handleClose}
              sx={{
                alignSelf: { xs: 'flex-end', md: 'center' },
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                px: 3,
                py: 1,
                whiteSpace: 'nowrap',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6366F1, #9333EA)',
                },
              }}
            >
              FECHAR
            </Button>
          </Box>
        </Paper>
      </Slide>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              background: '#FFFFFF',
              border: '1px solid rgba(79,70,229,0.15)',
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 800,
          }}
        >
          Política de Privacidade
          <IconButton
            onClick={() => setDialogOpen(false)}
            size="small"
            aria-label="Fechar política de privacidade"
            sx={{ color: 'text.secondary', WebkitTextFillColor: 'unset' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

          <DialogContent dividers sx={{ borderColor: 'rgba(79,70,229,0.12)' }}>
          {policy.map((section) => (
            <Box key={section.title} sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: 'primary.light',
                  mb: 0.75,
                  fontSize: '0.9rem',
                }}
              >
                {section.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {section.description}
              </Typography>
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
}
