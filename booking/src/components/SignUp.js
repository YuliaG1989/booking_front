import {React, useState,  useEffect}   from 'react'
import {Navigate, Link} from 'react-router-dom'
import { toast } from "react-toastify";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ginger from '../ginger.avif'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

const theme = createTheme()


const SignUp= ()=>{

    const [newClient, setNewClient] = useState({
      firstname: "",
      lastname: "",
      pets: "",
      phone: "",
      email: "",
      password: ""
      
    })
  const {firstname, lastname, pets, phone, email, password } = newClient
  const handleChange = e =>
    setNewClient({...newClient, [e.target.name]: e.target.value}); 

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const setAuth = boolean => {
  setIsAuthenticated(boolean);
}
// ___CREATE PROFILE

const createProfile = async (e)=>{
  e.preventDefault();

  try{
    const body = {firstname, lastname, pets,phone, email, password }
    const response = await fetch(
      "http://localhost:5000/signup",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );
    const parseRes = await response.json();
      console.log(parseRes)
    if (parseRes.token) {
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
      
    } else {
      setAuth(false);
      toast.error(parseRes);
    }
  } catch (err) {
    console.error(err.message);
  }
 }


    return(
        <>
        <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
       
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
            </Avatar>
            <Typography component="h1" variant="h5">
              Create an Account
            </Typography>
            { !isAuthenticated ? 
            <Box component="form" noValidate  sx={{ mt: 1 }} onSubmit ={createProfile}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstname"
                label="First Name"
                type="text"
                id="firstname" 
                 onChange={e=> handleChange(e)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="lastname"
                label="Last Name"
                type="text"
                id="lastname" 
                 onChange={e=> handleChange(e)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="pets"
                label="Pets"
                type="text"
                id="pets" 
                 onChange={e=> handleChange(e)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                type="number"
                id="phone" 
                 onChange={e=> handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus onChange={e=> handleChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" onChange={e=> handleChange(e)}
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
              >
                Sign Up
              </Button>

              <Grid container>
      
                <Grid item>
                  

                  
                </Grid>
              </Grid>
            </Box>
             : <Navigate to="/login"/>}
                 <Typography variant="body2" color="text.secondary" align="center">

                  <FormHelperText ><h3>Already Have an Account? Sign In!</h3>
        <Link class = 'link' to="/login">
        <Button sx={{width:250}} variant="contained"> Sign In </Button>
        </Link>
        </FormHelperText>
        <FormHelperText ><h3>Or Go back to the Main Page</h3>
        <Link class = 'link' to="/">
        <Button sx={{width:250}} variant="contained"> Main Page </Button>
        </Link>
        </FormHelperText>
        </Typography>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1801&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>

  

        {/* <Container className='form'>
        { !isAuthenticated ? 
        <form onSubmit = {createProfile}>
        <FormControl sx={{marginTop: 20}}> */}
     
      {/* <InputLabel>First Name</InputLabel> */}
      {/* <Input sx={{width:500}} type='text' name= 'firstname' placeholder='First Name' onChange= {e=> handleChange(e)}/><br/> */}
      {/* <InputLabel>Last Name</InputLabel> */}
      {/* <Input  type='text' name= 'lastname' placeholder='Last Name' onChange= {e=> handleChange(e)}/><br/> */}
      {/* <InputLabel>Pets</InputLabel> */}
      {/* <Input  type='text' name= 'pets' placeholder='Pets' onChange= {e=> handleChange(e)}/><br/> */}
      {/* <InputLabel>Email</InputLabel> */}
      {/* <Input  type='text' name= 'email' placeholder='Email' onChange= {e=> handleChange(e)}/><br/> */}
      {/* <InputLabel>Password</InputLabel> */}
      {/* <Input  type='password' name= 'password' placeholder='Password' onChange= {e=> handleChange(e)}/><br/> */}
      {/* <InputLabel>Phone</InputLabel> */}
      {/* <Input  type='number' name= 'phone' placeholder='Phone' onChange= {e=> handleChange(e)}/><br/>
      <Button sx={{width:90}} variant="contained" type="submit" value = "Sign Up">Sign Up</Button>
     
    </FormControl>
    </form>
    : <Navigate to="/login"/>}
       <FormHelperText ><h4>Already Have an Account? Please Log in</h4>
    <Link to="/login">
    <Button variant="contained">Sign In</Button>
    </Link>
    </FormHelperText>
    <FormHelperText ><h4>Or Go back to the Main Page</h4>
    <Link to="/">
    <Button variant="contained"> Main Page </Button>
    </Link>
    </FormHelperText>
</Container> */}
        </>
    )
}


export default SignUp