import './App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {FaCat} from 'react-icons/fa';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <a color="inherit" href="#">
        The Great Catsby.
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#00897b',
      },
      secondary: {
        main: '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        'Amatic SC',
        'cursive',
      ].join(','),
    },
  }
)



function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("https://thegreatcat.herokuapp.com/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  return (
    <>

      <ThemeProvider theme={theme}>

          <AppBar position="absolute" >
            <Toolbar sx={{
              display:  "flex" ,
              
              flexDirection: "row",
              justifyContent: "space-between",
              
            }}>
              <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.5 }}>
                  <h1>The Great Catsby<FaCat/></h1>
                </Typography>
              </Toolbar>
              <Toolbar>
                

                {isAuthenticated ? <Link class='link' to="/home"> 
                  <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant="contained"> Your Account</Button>
                </Link> : 
                <>
                <Link class='link' to="/login" >
                  <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant="contained" >Sign in</Button>
                </Link>
                <Link class='link' to="/signup" >
                  <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant="contained">Sign Up</Button>
                </Link > </>}
              </Toolbar>
            </Toolbar>
          </AppBar>


          <Box

            sx={{
              // backgroundImage: 'url(https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80)',
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
           
            <Container sx={{marginTop: '100px'}}>
              <Typography sx={{fontSize: 25}}>
            <h2>No more cages, kennels, growls, or yowls. 
            Cats deserve quality, in-home care and that's why we've created a nationwide network of trusted and insured cat sitters 
            who can bring the purrfect hospitality to you!</h2>
            </Typography>
            </Container>
            
                <Grid sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Card sx={{ width: 400, margin: 2 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        Create a profile!
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/signup" >
                      <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant='contained' color='primary'>Here</Button>
                    </Link >

                  </Card>
                  <Card sx={{ width: 400, margin: 2 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1602924097911-a78ca1af38c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1133&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        Login
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant='contained' color='primary'>Here</Button>
                    </Link >

                  </Card>

                  <Card sx={{  width: 400, margin: 2 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1565190462842-d57a3e05de48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=723&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h3" component="div">
                        Book a stay
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant='contained' color='primary'>Here</Button>
                    </Link >

                  </Card>
                  <Card sx={{  width: 400, margin: 2 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1609533440656-68c27fc2862d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        See our store
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button sx={{fontSize: 20, fontWeight: 'bold'}} variant='contained' color='primary'>Here</Button>
                    </Link >

                  </Card>
                </Grid>



            <Grid item xs={12} sx={{
               backgroundImage: 'url(https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80)',
               height: 500,
               backgroundSize: 'cover'
            }}>
           
            </Grid>
          </Box>

    
        <footer>
          <Copyright color='primary' sx={{ pt: 4 }} />
        </footer>
      </ThemeProvider>





    </>
  );
}

export default App;
