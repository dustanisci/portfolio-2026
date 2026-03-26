import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { Urls } from '../../data/portfolio';

const ROBOT_003 = 'https://raw.githubusercontent.com/dustanisci/portfolio-react-hooks/master/src/assets/img/003.png';

export default function Experience() {
  const [careerText, setCareerText] = useState<string[]>([]);

  useEffect(() => {
    const years = String(new Date().getFullYear() - 2015);
    fetch(Urls.Career)
      .then((r) => r.json() as Promise<{ content: string[] }>)
      .then((data) => setCareerText(data.content.map((p) => p.replace('{0}', years))))
      .catch(() => {});
  }, []);

  return (
    <Box
      id="carreira"
      component="section"
      aria-label="Carreira"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#F8F7F4',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '-15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Carreira" subtitle="Trajetória profissional" />

        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
          {/* Text column */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box data-aos="fade-up">
              {careerText.map((para, i) => (
                <Typography
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2.5, lineHeight: 1.9, fontSize: { xs: '0.97rem', md: '1.05rem' } }}
                >
                  {para}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Decoration column */}
          <Grid size={{ xs: 12, md: 4 }} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', pt: 4 }}>
            <Box
              component={motion.div}
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              <Box
                component="img"
                src={ROBOT_003}
                alt=""
                aria-hidden="true"
                sx={{
                  width: 220,
                  opacity: 0.88,
                  filter: 'drop-shadow(0 8px 24px rgba(79,70,229,0.2))',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
