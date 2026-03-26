import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Chip,
  Typography,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import { Urls } from '../../data/portfolio';
import type { IApiSkillsItem, IApiSkillsResponse } from '../../types';

const ROBOT_007 = 'https://raw.githubusercontent.com/dustanisci/portfolio-react-hooks/master/src/assets/img/007.png';

export default function Skills() {
  const [skills, setSkills] = useState<IApiSkillsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(Urls.Skills)
      .then((r) => r.json() as Promise<IApiSkillsResponse>)
      .then((data) => {
        setSkills(data.skills);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const query = search.trim().toLowerCase();

  return (
    <Box
      id="habilidades"
      component="section"
      aria-label="Habilidades"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#EEEDFB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Habilidades" subtitle="Competências técnicas" />

        {/* Robot 007 decoration */}
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'absolute',
            right: { md: '2%', lg: '5%' },
            top: '8%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <Box
            component={motion.div}
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          >
            <Box
              component="img"
              src={ROBOT_007}
              alt=""
              aria-hidden="true"
              sx={{
                width: 180,
                opacity: 0.7,
                  filter: 'drop-shadow(0 8px 24px rgba(124,58,237,0.25))',
              }}
            />
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} sx={{ color: 'primary.main' }} />
          </Box>
        ) : (
          <Box>
            {/* Search */}
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar habilidade..."
              size="small"
              aria-label="Buscar habilidade"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.disabled', fontSize: '1.1rem' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 6,
                maxWidth: { xs: '100%', sm: '320px' },
                '& .MuiOutlinedInput-root': {
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  '& fieldset': { borderColor: 'rgba(79,70,229,0.25)' },
                  '&:hover fieldset': { borderColor: 'rgba(79,70,229,0.55)' },
                  '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                },
                '& input': { color: 'text.primary', fontSize: '0.9rem' },
              }}
            />

            {/* All categories stacked vertically */}
            {skills.map((cat, ci) => {
              const items = query
                ? cat.items.filter((item) => item.toLowerCase().includes(query))
                : cat.items;
              if (query && items.length === 0) return null;
              return (
                <Box
                  key={cat.title}
                  data-aos="fade-up"
                  data-aos-delay={ci * 80}
                  sx={{ mb: 5 }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      display: 'block',
                      mb: 2,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {cat.title}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {items.map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        sx={{
                          background: '#FFFFFF',
                          border: '1px solid rgba(79,70,229,0.18)',
                          color: 'text.primary',
                          fontWeight: 500,
                          fontSize: '0.88rem',
                          px: 1,
                          height: '38px',
                          cursor: 'default',
                          transition: 'all 0.25s ease',
                          '&:hover': {
                            background: 'rgba(79,70,229,0.08)',
                            border: '1px solid rgba(79,70,229,0.45)',
                            color: 'primary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(79,70,229,0.18)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              );
            })}

            {query && skills.every((cat) => !cat.items.some((item) => item.toLowerCase().includes(query))) && (
              <Typography color="text.disabled" sx={{ py: 4, textAlign: 'center' }}>
                Nenhuma habilidade encontrada para &ldquo;{search}&rdquo;
              </Typography>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
