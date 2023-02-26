// icons
import playIcon from '@iconify/icons-carbon/play';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Button, Box } from '@mui/material';
// components
import { Iconify, Image } from '../../../components';
import {useNavigate} from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  [theme.breakpoints.up('md')]: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
}));


// ----------------------------------------------------------------------

export default function MarketingLandingHero() {
  
const navigate = useNavigate()
  return (
    <RootStyle>
      <Container>
        <Grid container columnSpacing={10} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6} lg={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={5}>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                NoNoise NYC
              </Typography>

              <Typography variant="h1">Reduce Noise Pollution in our environment.</Typography>

              <Typography sx={{ color: 'text.secondary' }}>
              NoNoise NYC is dedicated to promoting a quieter world, one community at a time. We recognize the detrimental effects that noise pollution has on the mental, physical, and financial well-being of our members in low-income neighborhoods.
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={{ xs: 'center', md: 'unset' }}
                spacing={3}
              >
                <Button variant="contained" size="large" onClick={  navigate('/login')}>
                  Sign Up Today
                </Button>

                <Button
                  disableRipple
                  color="inherit"
                  size="large"
                  startIcon={
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: (theme) => `solid 2px ${alpha(theme.palette.primary.main, 0.24)}`,
                      }}
                    >
                      <Iconify
                        icon={playIcon}
                        sx={{ width: 24, height: 24, color: 'primary.main' }}
                      />
                    </Box>
                  }
                  sx={{
                    px: 0,
                    '&:hover': { bgcolor: 'transparent' },
                  }}
                >
                  See Our Work
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={7}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Image
              alt="marketing-market"
              src="./landing/newLogo.png"
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
