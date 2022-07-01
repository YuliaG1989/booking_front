import {React, useState,  useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
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
const Login = ()=>{
    const [currentClient, setCurrentClient] = useState({
        email: "",
        password: ""
      });
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setAuth = boolean => {
      setIsAuthenticated(boolean);
    }
      const { email, password } = currentClient;
    
      const onChange = e =>
        setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try{
          const body = { email, password };

          const response = 
           await fetch(
            "http://localhost:5000/login",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();
    
          if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            console.log(parseRes)
            setAuth(true);
            toast.success("Logged in Successfully");
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
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1915&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',}} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            { !isAuthenticated ? 
            <Box component="form" noValidate  sx={{ mt: 1 }} onSubmit ={onSubmitForm}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus onChange={e=>onChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password" onChange={e=>onChange(e)}
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
                Sign In
              </Button>

              <Grid container>
      
                <Grid item>
                  

                  
                </Grid>
              </Grid>
            </Box>
             : <Navigate to="/home"/>}
                 <Typography variant="body2" color="text.secondary" align="center">

                  <FormHelperText ><h3>Don't Have an Account? Create One</h3>
        <Link class = 'link' to="/signup">
        <Button sx={{width:250}} variant="contained"> Sign Up </Button>
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
      </Grid>
    </ThemeProvider>

    
        {/* <Container className='form'>

        { !isAuthenticated ? 
        
        <form onSubmit ={onSubmitForm} >
            <FormControl sx={{marginTop: 20}}>
            <Input sx={{width:400}} type="text" name = 'email' placeholder="Email" onChange={e=>onChange(e)}/><br/>
          
            <Input sx={{width:400}} type="password" name = 'password' placeholder="Password" onChange={e=>onChange(e)}/><br/>
            <Button sx={{width:90}} variant="contained" type="submit" value = "Login">Sign In</Button>
            </FormControl>
        </form>
        : <Navigate to="/home"/>}
        <FormHelperText ><h4>Don't Have an Account? Create One</h4>
        <Link to="/signup">
        <Button variant="contained"> Sign Up </Button>
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


export default Login;