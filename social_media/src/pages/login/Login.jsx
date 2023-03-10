import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AppContext from "../../context/appContext";
import "./login.css";

export default function Login({ setAuth }) {
  const { setUser, setIsAuth, isAuth,user } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
 
    
    loginUser()

    async function loginUser() {
      const res = await fetch(`http://localhost:4005/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      console.log(data)
      if (!data.token) {
        setIsAuth(false);
        return;
      }
      setRefreshToken(data.refreshToken)

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem('currUser', JSON.stringify(data.user));
      setIsAuth(data.isAuth);
          if(isAuth){
    navigate(`/home`);
      setUser(data.user)}
      window.localStorage.clear();
    
    }

      }
      
    
  
  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
        NoNoise NYC
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} className="avatarPic">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item className="toSignUp">
              <NavLink to="/signup">
              {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} className="copyright"/>
    </Container>
  </ThemeProvider>
  )
      }
