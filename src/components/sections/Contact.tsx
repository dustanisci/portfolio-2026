import { Box, Container, Grid, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SectionTitle from '../ui/SectionTitle';

const personalInfo = {
  linkedin: 'https://www.linkedin.com/in/dustanisci/',
  github: 'https://github.com/dustanisci',
  location: 'São Paulo, SP — Brasil',
};

const contacts = [
  {
    icon: LinkedInIcon,
    label: 'LinkedIn',
    value: '/in/dustanisci',
    href: personalInfo.linkedin,
    color: '#0A66C2',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/dustanisci',
    href: personalInfo.github,
    color: '#374151',
  },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Box
      id="contato"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#EEEDFB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Contato" subtitle="Vamos conversar?" />

        <Grid
          container
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
          ref={ref}
        >
          {/* Left: Call to action */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Tem um projeto{' '}
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  incrível
                </Box>{' '}
                em mente?
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' } }}
              >
                Desenvolvo soluções que resolvem problemas de verdade.
                Se você tem um projeto relevante ou quer trocar ideias sobre tecnologia, vamos conversar pelo LinkedIn.
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mb: 4 }}>
                📍 {personalInfo.location}
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LinkedInIcon />}
                  endIcon={<OpenInNewIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{ py: 1.5, px: 3.5 }}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  endIcon={<OpenInNewIcon sx={{ fontSize: '0.9rem !important' }} />}
                  sx={{ py: 1.5, px: 3.5 }}
                >
                  GitHub
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right: Contact cards */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              {contacts.map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <Paper
                    key={contact.label}
                    component={motion.a}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.12 + 0.2 }}
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      p: { xs: 2, md: 2.5 },
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(79,70,229,0.12)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(79,70,229,0.4)',
                        background: 'rgba(79,70,229,0.04)',
                        transform: 'translateX(6px)',
                        boxShadow: '0 8px 32px rgba(79,70,229,0.14)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: `${contact.color}25`,
                        border: `1px solid ${contact.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: contact.color, fontSize: '1.35rem' }} />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="caption" color="text.disabled" sx={{ fontWeight: 600, letterSpacing: '0.06em', fontSize: '0.7rem' }}>
                        {contact.label.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {contact.value}
                      </Typography>
                    </Box>
                    <OpenInNewIcon sx={{ color: 'text.disabled', fontSize: '0.9rem', flexShrink: 0 }} />
                  </Paper>
                );
              })}

              {/* 005.png robot decoration */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Box
                  component="img"
                  src="https://raw.githubusercontent.com/dustanisci/portfolio-react-hooks/master/src/assets/img/005.png"
                  alt=""
                  aria-hidden="true"
                  sx={{
                    width: { xs: 90, md: 110 },
                    opacity: 0.85,
                    filter: 'drop-shadow(0 4px 16px rgba(79,70,229,0.2))',
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
