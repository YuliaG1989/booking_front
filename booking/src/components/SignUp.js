import {React, useState,  useEffect}   from 'react'
import {Navigate, Link} from 'react-router-dom'
import { toast } from "react-toastify";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
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
        <h1>Create an Account</h1>
        
  
  

        <Container className='form'>
        { !isAuthenticated ? 
        <form onSubmit = {createProfile}>
        <FormControl sx={{marginTop: 20}}>
     
      {/* <InputLabel>First Name</InputLabel> */}
      <Input sx={{width:500}} type='text' name= 'firstname' placeholder='First Name' onChange= {e=> handleChange(e)}/><br/>
      {/* <InputLabel>Last Name</InputLabel> */}
      <Input  type='text' name= 'lastname' placeholder='Last Name' onChange= {e=> handleChange(e)}/><br/>
      {/* <InputLabel>Pets</InputLabel> */}
      <Input  type='text' name= 'pets' placeholder='Pets' onChange= {e=> handleChange(e)}/><br/>
      {/* <InputLabel>Email</InputLabel> */}
      <Input  type='text' name= 'email' placeholder='Email' onChange= {e=> handleChange(e)}/><br/>
      {/* <InputLabel>Password</InputLabel> */}
      <Input  type='password' name= 'password' placeholder='Password' onChange= {e=> handleChange(e)}/><br/>
      {/* <InputLabel>Phone</InputLabel> */}
      <Input  type='number' name= 'phone' placeholder='Phone' onChange= {e=> handleChange(e)}/><br/>
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
</Container>
        </>
    )
}


export default SignUp