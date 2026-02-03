import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { keyframes } from '@emotion/react'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const floatAnimation = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`

const LandingPage = () => {
  const orangePrimary = '#FF9800'
  const orangeLight = '#FFE0B2'
  const orangeDark = '#F57C00'
  const accentOrange = '#FF6F00'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, #FFFFFF 0%, ${orangeLight}30 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '-200px',
          right: '-200px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${orangePrimary}25 0%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: `${floatAnimation} 8s ease-in-out infinite`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentOrange}20 0%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: `${floatAnimation} 10s ease-in-out infinite 1s`,
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 2.5, md: 4 },
            padding: { xs: 2, md: 0 },
          }}
        >
          {/* Premium Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 24px',
              borderRadius: '50px',
              background: `linear-gradient(135deg, ${orangeLight} 0%, ${orangeLight}60 100%)`,
              border: `2px solid ${orangePrimary}`,
              animation: `${fadeInUp} 0.8s ease-out`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', md: '0.85rem' },
                fontWeight: 800,
                color: orangeDark,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                background: `linear-gradient(135deg, ${orangeDark} 0%, ${accentOrange} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome to the future of learning
            </Typography>
          </Box>

          {/* Main Title */}
          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.1s backwards` }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '3.5rem', sm: '4.5rem', md: '5.5rem' },
                fontWeight: 900,
                background: `linear-gradient(135deg, ${orangeDark} 0%, ${accentOrange} 50%, ${orangePrimary} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: { xs: 1, md: 2 },
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              ResiLern
            </Typography>
          </Box>

          {/* Subtitle */}
          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.2s backwards` }}>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                fontWeight: 600,
                color: '#2C3E50',
                maxWidth: '650px',
                lineHeight: 1.5,
                letterSpacing: '-0.005em',
              }}
            >
              Integrated Online Learning Platform
            </Typography>
          </Box>

          {/* Description */}
          <Box sx={{ animation: `${fadeInUp} 0.8s ease-out 0.3s backwards` }}>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                color: '#555',
                maxWidth: '580px',
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: '0.3px',
              }}
            >
              Unlock your potential with our comprehensive online learning platform. Learn from industry experts, build real skills, and transform your future.
            </Typography>
          </Box>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 3 },
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: { xs: 3, md: 4 },
              animation: `${fadeInUp} 0.8s ease-out 0.4s backwards`,
            }}
          >
            <Button
              component={RouterLink}
              to="/home"
              variant="contained"
              size="large"
              sx={{
                paddingX: { xs: 3.5, md: 5 },
                paddingY: { xs: 1.3, md: 1.8 },
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                background: `linear-gradient(135deg, ${orangePrimary} 0%, ${orangeDark} 100%)`,
                color: '#fff',
                boxShadow: `0 8px 32px ${orangePrimary}40`,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  transition: 'left 0.5s',
                },
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: `0 16px 48px ${orangePrimary}50`,
                  '&::before': {
                    left: '100%',
                  },
                },
                '&:active': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started Now
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                paddingX: { xs: 3.5, md: 5 },
                paddingY: { xs: 1.3, md: 1.8 },
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                fontWeight: 700,
                borderRadius: '12px',
                textTransform: 'none',
                borderWidth: '2.5px',
                borderColor: orangePrimary,
                color: orangeDark,
                background: 'rgba(255, 152, 0, 0.04)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: orangeDark,
                  background: `linear-gradient(135deg, ${orangeLight}40 0%, ${orangeLight}20 100%)`,
                  color: orangeDark,
                  transform: 'translateY(-6px)',
                  boxShadow: `0 12px 32px ${orangePrimary}25`,
                },
                '&:active': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Explore More
            </Button>
          </Box>

          {/* Trust badge */}
          <Box
            sx={{
              marginTop: { xs: 4, md: 6 },
              animation: `${fadeInUp} 0.8s ease-out 0.5s backwards`,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: '#999',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Trusted by 10,000+ learners worldwide - 4.9/5 rating
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default LandingPage
