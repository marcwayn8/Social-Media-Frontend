import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import logo from './newLogo.png'

// import HomepageWithoutLogin from './components/homePageWithoutlogin/HomePageWithoutLogin'

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar style={{
          display: "flex",
          margin: "20px",
          height: "120px",
          backgroundColor: "black",

          position: "relative",
          top: "0px"

        }}>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <img src={logo} alt='1' id='img' style={{
              width: "auto",
              marginLeft: "5px"
            }} />

          </Typography>
          <Button color='white' onClick={() => { navigate('/login') }}>Login</Button>
          <Button color='white' onClick={() => { navigate('/signup') }}>Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
