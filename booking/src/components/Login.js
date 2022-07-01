import {React, useState,  useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'

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
        <h1>Login</h1>
        <Container className='form'>

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
        </Container>
        </>
    )
}


export default Login;