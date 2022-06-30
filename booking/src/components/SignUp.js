import {React, useState,  useEffect}   from 'react'
import {Navigate, Link} from 'react-router-dom'
import { toast } from "react-toastify";

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
        <h1>Sign Up</h1>
        <div className='form'>
        { !isAuthenticated ? 
     <form onSubmit = {createProfile}>
      <label>First Name</label>
      <input type='text' name= 'firstname' placeholder='First Name' onChange= {e=> handleChange(e)}/><br/>
      <label>Last Name</label>
      <input type='text' name= 'lastname' placeholder='Last Name' onChange= {e=> handleChange(e)}/><br/>
      <label>Pets</label>
      <input type='text' name= 'pets' placeholder='Pets' onChange= {e=> handleChange(e)}/><br/>
      <label>Email</label>
      <input type='text' name= 'email' placeholder='Email' onChange= {e=> handleChange(e)}/><br/>
      <label>Password</label>
      <input type='password' name= 'password' placeholder='Password' onChange= {e=> handleChange(e)}/><br/>
      <label>Phone</label>
      <input type='number' name= 'phone' placeholder='Phone' onChange= {e=> handleChange(e)}/><br/>
      <input type= 'submit' value='Submit'/>
    </form>  : <Navigate to="/login"/>}

    <Link to="/login">Login</Link>|{""}
    <Link to="/">Main</Link>
</div>
        </>
    )
}


export default SignUp