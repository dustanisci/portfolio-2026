import { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Avatar, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';

import SectionTitle from '../ui/SectionTitle';
import { Urls } from '../../data/portfolio';
import type { IApiAboutResponse } from '../../types';
import eduardoPhoto from '../../assets/edu1.png';

export default function About() {
  const [paragraphs, setParagraphs] = useState<string[]>([]);

  useEffect(() => {
    const years = new Date().getFullYear() - 2015;
    fetch(Urls.About)
      .then((r) => r.json() as Promise<IApiAboutResponse>)
      .then((data) => {
        setParagraphs(data.content.map((p) => p.replace('{0}', String(years))));
      })
      .catch(() => {
        setParagraphs([
          `Eduardo Stanisci é desenvolvedor sênior com cerca de ${years} anos de experiência em programação, formado em Análise e Desenvolvimento de Sistemas pelo Senac.`,
          'Possui experiências com grandes projetos utilizando metodologias ágeis, Scrum e Kanban.',
        ]);
      });
  }, []);

  return (
    <Box
      id="sobre"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#F8F7F4',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative line */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '100%',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(79,70,229,0.14), rgba(124,58,237,0.14), transparent)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Sobre Mim" subtitle="Quem sou eu" />

        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          {/* Photo side */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              data-aos="fade-right"
              data-aos-duration="800"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                }}
              >
                {/* Glowing border ring */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: '-4px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    zIndex: 0,
                    filter: 'blur(2px)',
                  }}
                />
                <Avatar
                  src={eduardoPhoto}
                  alt="Eduardo Stanisci"
                  sx={{
                    width: { xs: 220, sm: 260, md: 300 },
                    height: { xs: 220, sm: 260, md: 300 },
                    position: 'relative',
                    zIndex: 1,
                    border: '4px solid #FFFFFF',
                    bgcolor: '#EEF2FF',
                    objectFit: 'cover',
                  }}
                />
                {/* Floating experience badge */}
                <Box
                  component={motion.div}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: -16,
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    borderRadius: '12px',
                    px: 2,
                    py: 1,
                    zIndex: 2,
                    boxShadow: '0 8px 28px rgba(79,70,229,0.35)',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.3rem', lineHeight: 1 }}>
                    +{new Date().getFullYear() - 2015}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.68rem', fontWeight: 600 }}>
                    ANOS
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Text side */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              {paragraphs.map((para, i) => (
                <Typography
                  key={i}
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 2.5,
                    fontSize: { xs: '0.95rem', md: '1.02rem' },
                    lineHeight: 1.85,
                  }}
                >
                  {para}
                </Typography>
              ))}

              <Divider sx={{ borderColor: 'rgba(79,70,229,0.12)', my: 3 }} />

              {/* Quick info */}
              <Stack spacing={1.5}>
                <Box data-aos="fade-up" data-aos-delay="50" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <LocationOnIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    São Paulo, SP — Brasil
                  </Typography>
                </Box>
                <Box data-aos="fade-up" data-aos-delay="150" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <SchoolIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                  <Typography variant="body2" color="text.secondary">
                    Análise e Desenvolvimento de Sistemas — Senac, 2016
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>


      </Container>
    </Box>
  );
}
