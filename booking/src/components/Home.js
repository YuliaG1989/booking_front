import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import ginger from '../ginger.avif'
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







const Home = ()=>{
  

  const [clients, setClients] = useState([])
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [pets, setPets] = useState([])
  const[email, setEmail] = useState()
  const[password, setPassword] = useState()
  const [phone, setPhone] = useState()

const [currentClient, setCurrentClient]= useState()
const [currentClientID, setCurrentClientID]= useState()
const [isAuthenticated, setIsAuthenticated] = useState(true)
  
 // ___FETCH CLIENTS
    const getCurrentClient = async () => {
      try {
        const res = await fetch("http://localhost:5000/home/", {
          method: "GET",
          headers: { token: localStorage.token}
        });
  
        const parseRes = await res.json();
        
        setCurrentClient(parseRes.firstname);
        setCurrentClientID(parseRes.id)
      } catch (err) {
        console.error(err.message);
      }
    };

    //____LOGOUT
    const Logout = () => {
      setIsAuthenticated(false) 
      localStorage.removeItem("token")
    };

  useEffect(() => {
    getCurrentClient();
  }, []);
  // ___FETCH CLIENTS


const getClients = () =>{
  axios.get("http://localhost:5000").then(response =>{
    setClients(response.data)
  })
} 

useEffect(() => {
  getClients();
}, []);

  // ____UPDATE PROFILE
 const updateProfile = (event) => {
  event.preventDefault();
  
  axios.put( "http://localhost:5000/" + event.target.id,
         {
    firstname: firstname,
    lastname: lastname,
    pets: pets,
    phone: phone ,
    email: email, 
    password: password
         }).then(
      (response) => {
          setClients(response.data)
      }
  )
}
// ____DELETE PROFILE

const deleteProfile = (event) => {
  axios.delete("http://localhost:5000/" + event.target.value).then(
      (response) => {
          setClients(
             response.data
          )
      }
  )

}
    return(
        <>

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
            <h2>Welcome, {currentClient} !</h2>
            </Typography>
            </Toolbar>
            <Toolbar>
            <Link class='link'  to="/">
            <Button variant="contained"> Main Page </Button>
            </Link>
            <Button  variant="contained" onClick={Logout}> LogOut</Button>
           
           {!isAuthenticated ? <Navigate to="/"/>: null}
       
        
        </Toolbar>
          </Toolbar>
        </AppBar>
       
 
        <Box
          component="main"
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1491485880348-85d48a9e5312?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid sx={{marginTop:10}} container spacing={3}>
             
              <Grid  item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '90vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                             <iframe id="appointy-iframe" class="no-border" src="https://booking.appointy.com/catsby?isgadget=1&autoheight=1"  scrolling="no" width="100%" frameBorder="0"></iframe>
<script>
   { (function() {
        const ifrm = document.getElementById("appointy-iframe");
        window.addEventListener("message", function (e) {
            const d = e.data || {};
            if (d.type === "height"){
                ifrm.style.height = d.data + "px";
            }
            if (d.type === "scroll") {
                ifrm.scrollIntoView();
            }
        });
    })()}
</script>
   
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '45vh',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                                    {clients.map((getOne) =>{
        if(getOne.id === currentClientID){
      return(
        
        <div className='clients' key={getOne.id}>
      <Typography component="h4" variant="h5">
        <ul>
       
        <li> Pets: {getOne.pets}</li>
        <li> Email: {getOne.email}</li>
        <li> Phone: {getOne.phone}</li>
        </ul>
        </Typography>
        <details>
          <summary>Update Your Profile</summary>
       
      <FormControl onSubmit = {updateProfile} id={getOne.id}>
      
        <Input type='text' placeholder='First Name' onChange= {e=> setFirstName(e.target.value)}/><br/>
        <Input type='text' placeholder='Last Name' onChange= {e=> setLastName(e.target.value)}/><br/>
        <Input type='text' placeholder='Pets' onChange= {e=> setPets(e.target.value)}/><br/>
        <Input type='text' placeholder='Email' onChange= {e=> setEmail(e.target.value)}/><br/>
        <Input type='text' placeholder='Password' onChange= {e=> setPassword(e.target.value)}/><br/>
        <Input type='number' placeholder='Phone' onChange= {e=> setPhone(e.target.value)}/><br/>
      <Button variant="contained" type= 'submit' value='Submit'>Update</Button>
      <Button sx={{marginTop:2}} variant="contained" onClick={deleteProfile} value={getOne.id}>Delete</Button>

      </FormControl>
    
        </details>
        </div>

      )}

    })}
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor:'rgba(255, 255, 255, 0.2)' }}>
                <Copyright sx={{ pt: 4  }} />
                </Paper>
              </Grid>
            </Grid>
            
          </Container>
        </Box>
      </Box>
    </ThemeProvider>

        </>
    )
}


export default Home;