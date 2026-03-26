import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import SectionTitle from '../ui/SectionTitle';
import { Urls } from '../../data/portfolio';
import type { IApiPortfolioItem, IApiPortfolioResponse } from '../../types';

function getProjectName(galleries: string[]): string {
  if (!galleries.length) return 'Projeto';
  try {
    const parts = galleries[0].split('/');
    const folder = parts[parts.length - 2] ?? 'projeto';
    return folder.charAt(0).toUpperCase() + folder.slice(1);
    /* v8 ignore start */
  } catch {
    return 'Projeto';
  }
  /* v8 ignore stop */
}

function ProjectCard({
  item,
  index,
  onOpenGallery,
}: {
  item: IApiPortfolioItem;
  index: number;
  onOpenGallery: (item: IApiPortfolioItem) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cover = item.galleries[0] ?? '';
  const name = getProjectName(item.galleries);

  return (
    <Box
      data-aos="zoom-in-up"
      data-aos-delay={(index % 3) * 100}
      sx={{ height: '100%' }}
    >
      <Card
        onClick={() => onOpenGallery(item)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        role="button"
        tabIndex={0}
        aria-label={`Ver galeria de ${name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenGallery(item);
          }
        }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255,255,255,0.98)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:focus-visible': {
            outline: '2px solid rgba(79,70,229,0.7)',
            outlineOffset: '2px',
          },
        }}
      >
        {/* Cover image */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '60%',
            overflow: 'hidden',
            background: '#EEF2FF',
          }}
        >
          {cover && (
            <Box
              component="img"
              src={cover}
              alt={name}
              loading="lazy"
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
              }}
            />
          )}

          {/* Hover overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(79,70,229,0.82), rgba(124,58,237,0.82))',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
              Ver galeria
            </Typography>
          </Box>
        </Box>

        {/* Card footer */}
        <Box
          sx={{
            px: 2.5,
            py: 2,
            borderTop: '1px solid rgba(79,70,229,0.1)',
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: 'text.primary' }}>
            {name}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Projects() {
  const [items, setItems] = useState<IApiPortfolioItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<IApiPortfolioItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(Urls.Portfolio)
      .then((r) => r.json() as Promise<IApiPortfolioResponse>)
      .then((data) => setItems(data.portfolio))
      .catch(() => {});
  }, []);

  const handleOpenGallery = (item: IApiPortfolioItem) => {
    setSelectedItem(item);
    setCurrentIndex(0);
  };

  const handleClose = () => setSelectedItem(null);

  const handlePrev = useCallback(() => {
    /* v8 ignore next */
    if (!selectedItem) return;
    setCurrentIndex((i) => (i - 1 + selectedItem.galleries.length) % selectedItem.galleries.length);
  }, [selectedItem]);

  const handleNext = useCallback(() => {
    /* v8 ignore next */
    if (!selectedItem) return;
    setCurrentIndex((i) => (i + 1) % selectedItem.galleries.length);
  }, [selectedItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    },
    [handlePrev, handleNext],
  );

  const galleryName = selectedItem ? getProjectName(selectedItem.galleries) : '';

  return (
    <Box
      id="projetos"
      component="section"
      aria-label="Projetos"
      sx={{
        py: { xs: 8, md: 14 },
        background: '#F8F7F4',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(79,70,229,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <SectionTitle title="Projetos" subtitle="Alguns dos projetos que eu construí" />

        <Grid container spacing={3}>  
          {items.map((item, i) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <ProjectCard item={item} index={i} onOpenGallery={handleOpenGallery} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Gallery Modal */}
      <Dialog
        open={!!selectedItem}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        onKeyDown={handleKeyDown}
        aria-modal="true"
        aria-label={`Galeria de imagens – ${galleryName}`}
        slotProps={{
          paper: {
            sx: {
              background: '#FFFFFF',
              border: '1px solid rgba(79,70,229,0.15)',
              borderRadius: '16px',
              overflow: 'hidden',
            },
          },
        }}
      >
        {/* Modal header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2.5,
            py: 1.5,
            borderBottom: '1px solid rgba(79,70,229,0.1)',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
            {galleryName}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              aria-live="polite"
              sx={{ color: 'text.disabled', fontSize: '0.85rem', mr: 1 }}
            >
              {selectedItem ? `${currentIndex + 1} / ${selectedItem.galleries.length}` : ''}
            </Typography>
            <IconButton
              onClick={handleClose}
              size="small"
              aria-label="Fechar galeria"
              sx={{ color: 'text.secondary' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Modal image area */}
        <DialogContent
          sx={{
            p: 0,
            position: 'relative',
            background: '#F8FAFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: '220px', sm: '380px', md: '480px' },
          }}
        >
          {selectedItem && selectedItem.galleries.length > 0 && (
            <Box
              component="img"
              src={selectedItem.galleries[currentIndex]}
              alt={`${galleryName} — imagem ${currentIndex + 1}`}
              sx={{
                maxWidth: '100%',
                maxHeight: { xs: '220px', sm: '380px', md: '480px' },
                objectFit: 'contain',
                display: 'block',
              }}
            />
          )}

          {/* Prev arrow */}
          {selectedItem && selectedItem.galleries.length > 1 && (
            <IconButton
              onClick={handlePrev}
              aria-label="Imagem anterior"
              sx={{
                position: 'absolute',
                left: 8,
                color: '#fff',
                background: 'rgba(0,0,0,0.3)',
                '&:hover': { background: 'rgba(79,70,229,0.7)' },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* Next arrow */}
          {selectedItem && selectedItem.galleries.length > 1 && (
            <IconButton
              onClick={handleNext}
              aria-label="Próxima imagem"
              sx={{
                position: 'absolute',
                right: 8,
                color: '#fff',
                background: 'rgba(0,0,0,0.3)',
                '&:hover': { background: 'rgba(79,70,229,0.7)' },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
