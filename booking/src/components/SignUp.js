import {React, useState,  useEffect}   from 'react'
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'

import { toast } from "react-toastify";
import axios from 'axios'
const SignUp= (props)=>{
    const [clients, setClients] = useState([])
    const [firstname, setFirstName] = useState()
    const [lastname, setLastName] = useState()
    const [pets, setPets] = useState([])
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const getClients = () =>{
  axios.get("http://localhost:5000").then(response =>{
    setClients(response.data)
  })
} 

useEffect(() => {
  getClients();
}, []);


// ___CREATE PROFILE

const createProfile = (event)=>{
  event.preventDefault();
  axios.post("http://localhost:5000/",{
        firstname: firstname,
        lastname: lastname,
        pets: pets,
        phone: phone,
        email: email, 
        password: password

  } ).then(
    (response) => {
        setClients(response.data)
        setIsAuthenticated(true)
    }
)
}

    return(
        <>
        <h1>Sign Up</h1>
        <div className='form'>
        { !isAuthenticated ? 
     <form onSubmit = {createProfile}>
      <label>First Name</label>
      <input type='text' placeholder='First Name' onChange= {e=> setFirstName(e.target.value)}/><br/>
      <label>Last Name</label>
      <input type='text' placeholder='Last Name' onChange= {e=> setLastName(e.target.value)}/><br/>
      <label>Pets</label>
      <input type='text' placeholder='Pets' onChange= {e=> setPets(e.target.value)}/><br/>
      <label>Email</label>
      <input type='text' placeholder='Email' onChange= {e=> setEmail(e.target.value)}/><br/>
      <label>Password</label>
      <input type='text' placeholder='Password' onChange= {e=> setPassword(e.target.value)}/><br/>
      <label>Phone</label>
      <input type='number' placeholder='Phone' onChange= {e=> setPhone(e.target.value)}/><br/>
      <input type= 'submit' value='Submit'/>
    </form>  : <Navigate to="/login"/>}
    <Link to="/login">Login</Link>
</div>
        </>
    )
}


export default SignUp