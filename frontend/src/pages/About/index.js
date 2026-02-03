import React from 'react'
import { useIntl } from 'react-intl'
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import Page from '../../containers/Page/Page'
import Scrollbar from '../../components/Scrollbar'
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

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const About = () => {
  const intl = useIntl()
  const orangePrimary = '#FF9800'
  const orangeLight = '#FFE0B2'
  const orangeDark = '#F57C00'

  const teamMembers = [
    {
      id: 1,
      name: 'กฤตนัย บุญน้อย',
      role: '67030011',
      image: '/images/team/krittanai.jpg',
    },
    {
      id: 2,
      name: 'กันต์ฤทัย แก้วสว่าง',
      role: '67030021',
      image: '/images/team/kanruethai.jpg',
    },
    {
      id: 3,
      name: 'วิชญาพร เนียมเที่ยง',
      role: '67030211',
      image: '/images/team/wichayaporn.jpg',
    },
  ]

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
    >
      <Scrollbar>
        <Box
          sx={{
            minHeight: '100vh',
            background: `linear-gradient(135deg, #FFFFFF 0%, ${orangeLight}20 100%)`,
            paddingY: { xs: 6, md: 10 },
          }}
        >
          <Container maxWidth="lg">
            {/* Header Section */}
            <Box
              sx={{
                textAlign: 'center',
                marginBottom: { xs: 8, md: 12 },
                animation: `${fadeInUp} 0.8s ease-out`,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                  fontWeight: 900,
                  background: `linear-gradient(135deg, ${orangeDark} 0%, ${orangePrimary} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 2,
                  letterSpacing: '-0.01em',
                }}
              >
                About
              </Typography>
              <Box
                sx={{
                  width: '80px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${orangePrimary} 0%, ${orangeDark} 100%)`,
                  borderRadius: '2px',
                  margin: '0 auto',
                }}
              />
            </Box>
            <Grid
              container
              spacing={{ xs: 3, sm: 4, md: 5 }}
              sx={{
                animation: `${fadeInUp} 0.8s ease-out 0.2s backwards`,
              }}
            >
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Box
                    sx={{
                      animation: `${scaleIn} 0.6s ease-out ${0.1 * (index + 1)}s backwards`,
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${orangePrimary}10 0%, transparent 100%)`,
                          zIndex: 1,
                          pointerEvents: 'none',
                        },
                        '&:hover': {
                          transform: 'translateY(-16px)',
                          boxShadow: `0 24px 48px ${orangePrimary}30`,
                        },
                      }}
                    >
                      {/* Image Container */}
                      <Box
                        sx={{
                          position: 'relative',
                          aspectRatio: '3/4',
                          overflow: 'hidden',
                          background: `linear-gradient(135deg, ${orangeLight}60 0%, ${orangeLight}20 100%)`,
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={member.image}
                          alt={member.name}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            '.MuiCard-root:hover &': {
                              transform: 'scale(1.08)',
                            },
                          }}
                        />
                        {/* Overlay */}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(180deg, ${orangePrimary}0 0%, ${orangeDark}40 100%)`,
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            '.MuiCard-root:hover &': {
                              opacity: 1,
                            },
                            zIndex: 1,
                          }}
                        />
                      </Box>

                      {/* Content */}
                      <CardContent
                        sx={{
                          textAlign: 'center',
                          padding: { xs: 3, md: 3.5 },
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          background: '#fff',
                          position: 'relative',
                          zIndex: 2,
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: orangeDark,
                            marginBottom: 1.5,
                            fontSize: { xs: '1.2rem', md: '1.4rem' },
                            letterSpacing: '-0.5px',
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Box
                          sx={{
                            width: '40px',
                            height: '3px',
                            background: orangePrimary,
                            borderRadius: '2px',
                            margin: '0 auto 1.5rem',
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            color: orangePrimary,
                            fontWeight: 700,
                            fontSize: { xs: '0.9rem', md: '1rem' },
                            letterSpacing: '1px',
                            fontFamily: 'monospace',
                          }}
                        >
                          {member.role}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Grid>


          </Container>
        </Box>
      </Scrollbar>
    </Page>
  )
}

export default About
