import './App.css';
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'
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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

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

// ___FETCH CLIENTS
// const getClients = () =>{
//   axios.get("http://localhost:5000").then(response =>{
//     setClients(response.data)
//   })
// } 

// useEffect(() => {
//   getClients();
// }, []);


//___CREATE PROFILE

// const createProfile = (event)=>{
//   event.preventDefault();
//   axios.post("http://localhost:5000/",{
//         firstname: firstname,
//         lastname: lastname,
//         pets: pets,
//         phone: phone,
//         email: email, 
//         password: password

//   } ).then(
//     (response) => {
//         setClients(response.data
//         )
//     }
// )
// }

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

    
        {/* <Link class='link' to="/login" >
        <Button variant="contained">Sign in</Button>
          </Link> |{" "}
        <Link class='link' to="/signup" >
        <Button variant="contained">Sign Up</Button>
        </Link > |{" "}
        {isAuthenticated ? <Link class='link'  to="/home">
        <Button variant="contained">Your Account</Button>
        </Link> : ""} */}

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
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow:0.5 }}>
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
        {isAuthenticated ? <Link class='link'  to="/home">
        <Button variant="contained">Go to Your Account</Button>
        </Link> : ""}
        </Toolbar>
          </Toolbar>
        </AppBar>
       
          {/* <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton >
            
            </IconButton>
          </Toolbar> */}
          {/* <Divider />
          <List component="nav">
            
            <Divider sx={{ my: 1 }} />
            
          </List> */}
      
        <Box
          component="main"
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)',
          
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container>
            <Grid container spacing={3}>
             
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh',
                    marginTop: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                

            </Paper>
              
              </Grid>
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    opacity: 0.2,
                  }}
                >
           
                </Paper>
              </Grid> */}
             
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column',backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Copyright color='primary' sx={{ pt: 4 }} />
                </Paper>
              </Grid>
            </Grid>
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider>





    </>
  );
}

export default App;
