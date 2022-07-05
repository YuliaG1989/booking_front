import './App.css';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Store from './components/Store'
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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { height } from '@mui/system';

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
  }
)



function App() {
  // const [clients, setClients] = useState([])
  // const [firstname, setFirstName] = useState()
  // const [lastname, setLastName] = useState()
  // const [pets, setPets] = useState([])
  // const[email, setEmail] = useState()
  // const[password, setPassword] = useState()
  // const [phone, setPhone] = useState()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  }
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/verify", {
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


  //___CREATE PROFILE


  // ____UPDATE PROFILE
  //  const updateProfile = (event) => {
  //   event.preventDefault();

  //   axios.put( "http://localhost:5000/" + event.target.id,
  //          {
  //     firstname: firstname,
  //     lastname: lastname,
  //     pets: pets,
  //     phone: phone ,
  //     email: email, 
  //     password: password
  //          }).then(
  //       (response) => {
  //           setClients(response.data)
  //       }
  //   )
  // }
  // ____DELETE PROFILE

  // const deleteProfile = (event) => {
  //   axios.delete("http://localhost:5000/" + event.target.value).then(
  //       (response) => {
  //           setClients(
  //              response.data
  //           )
  //       }
  //   )

  // }

  return (
    <>

      {/* <Route exact path="/store" element={<Store />}/> */}


      <ThemeProvider theme={theme}>

        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" >
            <Toolbar sx={{
              display: { xs: "flex" },
              flexDirection: "row",

              justifyContent: "space-between"
            }}>
              <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 0.5 }}>
                  <h1>The Great Catsby.</h1>
                </Typography>
              </Toolbar>
              <Toolbar>
                <Link class='link' to="/login" >
                  <Button variant="contained" >Sign in</Button>
                </Link>
                <Link class='link' to="/signup" >
                  <Button variant="contained">Sign Up</Button>
                </Link >

                {isAuthenticated ? <Link class='link' to="/home" >
                  <Button variant="contained"> Your Account</Button>
                </Link> : ""}
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
            <Container>

              <Paper elevation={7}
                sx={{


                  width: '80vw',
                  marginTop: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
              >
                <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ width: 400, marginRight: 10 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Create a profile!
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/signup" >
                      <Button size='small' color='primary'>Here</Button>
                    </Link >

                  </Card>
                  <Card sx={{ width: 400, marginRight: 10 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Login
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button size='small' color='primary'>Here</Button>
                    </Link >

                  </Card>

                  <Card sx={{ width: 400, marginRight: 10 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Book a stay
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button size='small' color='primary'>Here</Button>
                    </Link >

                  </Card>
                  <Card sx={{ width: 400 }}>

                    <CardMedia
                      component="img"
                      height="140"
                      image='https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
                      alt="cat"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        See our store
                      </Typography>

                    </CardContent>


                    <Link class='link' to="/login" >
                      <Button size='small' color='primary'>Here</Button>
                    </Link >

                  </Card>
                </Grid>

              </Paper>

            </Container>

            <Grid item xs={12}>
              <Paper sx={{
                display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backgroundImage: 'url(https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80)',
                height: 500,
                backgroundSize: 'cover'
              }}>

              </Paper>
            </Grid>
          </Box>

        </Box>

        <footer>
          <Copyright color='primary' sx={{ pt: 4 }} />
        </footer>
      </ThemeProvider>





    </>
  );
}

export default App;
