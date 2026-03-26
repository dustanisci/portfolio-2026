import { Box, Container, Grid, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '../ui/SectionTitle';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    institution: 'Senac São Paulo',
    degree: 'Análise e Desenvolvimento de Sistemas',
    period: '2014 — 2016',
    description:
      'Formação superior com foco em desenvolvimento de software, engenharia de sistemas, banco de dados, algoritmos e estruturas de dados. Conclusão em 2016 com ingresso imediato no mercado de trabalho.',
  },
  {
    institution: 'Cursos Técnicos e Online',
    degree: 'Formação Contínua em Tecnologia',
    period: '2016 — Presente',
    description:
      'Atualização constante com cursos de tecnologias modernas: AWS Certified, Clean Architecture, React Avançado, Design System, TypeScript, DevOps e outras tendências do mercado.',
  },
];

function EducationCard({ item, index }: { item: (typeof education)[number]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Box
      ref={ref}
      component={motion.div}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Box
        sx={{
          p: { xs: 2.5, md: 3.5 },
          borderRadius: '16px',
          background: '#FFFFFF',
          border: '1px solid rgba(79,70,229,0.1)',
          boxShadow: '0 2px 12px rgba(79,70,229,0.06)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(79,70,229,0.4)',
            background: 'rgba(79,70,229,0.03)',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(79,70,229,0.14)',
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(79,70,229,0.08), rgba(124,58,237,0.08))',
            border: '1px solid rgba(79,70,229,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SchoolIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
        </Box>

        {/* Institution */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {item.institution}
        </Typography>

        {/* Degree */}
        <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
          {item.degree}
        </Typography>

        {/* Period */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarMonthIcon sx={{ color: 'text.disabled', fontSize: '0.85rem' }} />
          <Chip
            label={item.period}
            size="small"
            sx={{
              background: 'rgba(79,70,229,0.07)',
              border: '1px solid rgba(79,70,229,0.2)',
              color: 'rgba(79,70,229,0.7)',
            }}
          />
        </Box>

        {/* Description */}
        {item.description && (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: '0.88rem' }}>
            {item.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function Education() {
  return (
    <Box
      id="formacao"
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
          bottom: '0%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Formação" subtitle="Educação e cursos" />

        <Grid container spacing={3}>
          {education.map((item, i) => (
            <Grid key={item.institution} size={{ xs: 12, md: 4 }}>
              <EducationCard item={item} index={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
