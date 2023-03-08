import { styled, alpha } from '@mui/material/styles';
import { Grid, Stack, Container, Typography, Button, Box } from '@mui/material';
import logo from './landing.jpeg'
import { NavLink, useNavigate } from "react-router-dom";
// components

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(15, 0),
  [theme.breakpoints.up('md')]: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    
    <RootStyle>
      <Container>
        <Grid container columnSpacing={10} justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6} lg={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={5}>
              <Typography variant="overline" sx={{ color: 'primary.main'}} style={{ fontSize:  "28px" }}>
               NoNoise NYC
              </Typography>

              <Typography variant="h1">A quieter world is a better world.</Typography>

              <Typography sx={{ color: 'text.secondary' }}>
              NoNoise NYC is dedicated to promoting a quieter world, one community at a time. We recognize the detrimental effects that noise pollution has on the mental, physical, and financial well-being of our members in low-income neighborhoods. 
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={{ xs: 'center', md: 'unset' }}
                spacing={3}
              >
                <Button variant="contained" size="large" style={{ fontSize:  "18px", backgroundColor: "black" }} >
                <NavLink to="/signup"> Sign Up Today</NavLink> 
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
                    
                    </Box>
                  }
                  sx={{
                    px: 0,
                    '&:hover': { bgcolor: 'black' },
                  }}
                 
                >
                  <a href= "https://www.bing.com/ck/a?!&&p=03bcd8bf51a309eaJmltdHM9MTY3ODA2MDgwMCZpZ3VpZD0xMDRjODViMS03ZTczLTYyMmEtMGY5Yy05NzBiN2Y2YTYzY2YmaW5zaWQ9NTE4Ng&ptn=3&hsh=3&fclid=104c85b1-7e73-622a-0f9c-970b7f6a63cf&psq=noise+polluton+awareness+in+nyc&u=a1aHR0cHM6Ly9ueWMuZ292L2Fzc2V0cy9kZXAvZG93bmxvYWRzL3BkZi9lbnZpcm9ubWVudC9lZHVjYXRpb24vbDctc291bmQtbm9pc2UtcmVkdWN0aW9uLWNhbXBhaWduLnBkZg&ntb=1">Learn More</a>
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
            <img
              alt="marketing-market"
              src={logo}
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
