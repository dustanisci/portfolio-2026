import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Carreira', href: '#carreira' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Formação', href: '#formacao' },
  { label: 'Contato', href: '#contato' },
];

function handleNavClick(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 60 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        component={motion.header}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        sx={{
          background: scrolled
            ? 'rgba(248,247,244,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(79,70,229,0.12)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto', px: { xs: 2, md: 3 } }}>
          {/* Logo */}
          <Box
            component="a"
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <CodeIcon
              sx={{
                color: 'primary.main',
                fontSize: '1.8rem',
                filter: 'drop-shadow(0 0 8px rgba(79,70,229,0.4))',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.2rem',
                letterSpacing: '-0.01em',
              }}
            >
              Eduardo Stanisci
            </Typography>
          </Box>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box
              component="nav"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    px: 1.5,
                    py: 1,
                    minWidth: 'unset',
                    '&:hover': {
                      color: 'primary.main',
                      background: 'rgba(79,70,229,0.08)',
                    },
                    transition: 'color 0.2s ease',
                  }}
                >
                  {link.label}
                </Button>
              ))}
              <Button
                variant="contained"
                onClick={() => handleNavClick('#contato')}
                sx={{ ml: 1.5, py: 0.75, px: 2.5 }}
              >
                Contate-me
              </Button>
            </Box>
          )}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'primary.main' }}
              aria-label="Abrir menu"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            slotProps={{
              paper: {
                sx: {
                  width: '100%',
                  maxWidth: '320px',
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(24px)',
                  borderLeft: '1px solid rgba(79,70,229,0.12)',
                  p: 2,
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                E. Stanisci
              </Typography>
              <IconButton
                onClick={() => setDrawerOpen(false)}
                sx={{ color: 'text.secondary' }}
                aria-label="Fechar menu"
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <List sx={{ flex: 1 }}>
              {navLinks.map((link, i) => (
                <ListItem key={link.href} disablePadding>
                  <ListItemButton
                    component={motion.div}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => {
                      setDrawerOpen(false);
                      setTimeout(() => handleNavClick(link.href), 200);
                    }}
                      sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      '&:hover': {
                      background: 'rgba(79,70,229,0.08)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        color: 'text.primary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {
                setDrawerOpen(false);
                setTimeout(() => handleNavClick('#contato'), 200);
              }}
              sx={{ mt: 3 }}
            >
              Contate-me
            </Button>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
}
