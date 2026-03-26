import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { motion, type Variants } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const years = new Date().getFullYear() - 2015;

const personalInfo = {
  name: 'Eduardo Stanisci',
  tagline: `+${years} anos de experiência — hoje construindo com Inteligência Artificial`,
  linkedin: 'https://www.linkedin.com/in/dustanisci/',
  github: 'https://github.com/dustanisci',
};

export default function Hero() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('sobre');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 + 0.4, duration: 0.7, ease: 'easeOut' as const },
    }),
  };

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #F8F7F4 0%, #EEF2FF 50%, #F5F3FF 100%)',
      }}
    >
      {engineReady && (
        <Particles
          id="tsparticles"
          options={{
            fpsLimit: 60,
            particles: {
              number: { value: 70, density: { enable: true } },
              color: { value: ['#4F46E5', '#7C3AED', '#818CF8', '#A78BFA'] },
              shape: { type: 'circle' },
              opacity: {
                value: { min: 0.3, max: 0.8 },
                animation: { enable: true, speed: 0.8, sync: false },
              },
              size: {
                value: { min: 1, max: 2.5 },
                animation: { enable: true, speed: 2, sync: false },
              },
              links: {
                enable: true,
                distance: 150,
                color: '#4F46E5',
                opacity: 0.15,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.6,
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'bounce' },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: true, mode: 'push' },
              },
              modes: {
                grab: { distance: 130, links: { opacity: 0.4 } },
                push: { quantity: 3 },
              },
            },
            detectRetina: true,
          }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '-5%',
          width: { xs: '300px', md: '550px' },
          height: { xs: '300px', md: '550px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: { xs: '250px', md: '450px' },
          height: { xs: '250px', md: '450px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: { xs: 16, md: 18 },
          pb: { xs: 12, md: 16 },
        }}
      >
        <Box sx={{ maxWidth: { xs: '100%', md: '750px', lg: '820px' } }}>
          <motion.div custom={1} variants={textVariants} initial="hidden" animate="visible">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.6rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                fontWeight: 900,
                lineHeight: 1.1,
                mb: 1.5,
                background: 'linear-gradient(135deg, #1A1A2E 0%, #3730A3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personalInfo.name}
            </Typography>
          </motion.div>

          <motion.div custom={2} variants={textVariants} initial="hidden" animate="visible">
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.6rem' },
                fontWeight: 700,
                mb: 1.5,
                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                minHeight: { xs: '2.1rem', md: '3.2rem' },
              }}
            >
              Desenvolvedor Sênior
            </Typography>
          </motion.div>

          <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible">
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(75,85,99,0.9)',
                fontSize: { xs: '0.95rem', md: '1rem' },
                mb: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                component="span"
                sx={{
                  width: '32px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                }}
              />
              {personalInfo.tagline}
            </Typography>
          </motion.div>

          <motion.div custom={5} variants={textVariants} initial="hidden" animate="visible">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="body2" color="text.disabled" sx={{ fontSize: '0.8rem', mr: 0.5 }}>
                Conecte-se:
              </Typography>
              <Button
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkedInIcon />}
                variant="text"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  p: '6px 12px',
                  '&:hover': { color: 'primary.main', background: 'rgba(79,70,229,0.08)' },
                }}
              >
                LinkedIn
              </Button>
              <Button
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon />}
                variant="text"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  p: '6px 12px',
                  '&:hover': { color: 'primary.main', background: 'rgba(79,70,229,0.08)' },
                }}
              >
                GitHub
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </Container>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        onClick={handleScrollDown}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 40 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          color: 'rgba(79,70,229,0.35)',
          zIndex: 1,
          '&:hover': { color: 'primary.main' },
          transition: 'color 0.2s ease',
        }}
      >
        <Typography variant="caption" sx={{ letterSpacing: '0.1em', fontSize: '0.7rem' }}>
          SCROLL
        </Typography>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <KeyboardArrowDownIcon />
        </motion.div>
      </Box>
    </Box>
  );
}
