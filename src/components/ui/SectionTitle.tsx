import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Box
      component={motion.div}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{ textAlign: align, mb: { xs: 5, md: 7 } }}
    >
      <Typography
        variant="overline"
        sx={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'block',
          mb: 1.5,
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontWeight: 800,
          color: 'text.primary',
          mb: 2,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-10px',
            left: align === 'center' ? '50%' : '0',
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
            width: '60px',
            height: '3px',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            borderRadius: '2px',
            boxShadow: 'none',
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
