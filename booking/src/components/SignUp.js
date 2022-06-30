import {React, useState,  useEffect}   from 'react'
import {BrowserRouter, Routes, Route, Navigate, Link} from 'react-router-dom'

import { toast } from "react-toastify";
import axios from 'axios'
const SignUp= ()=>{
  //   const [newClient, setNewClient] = useState({
  //     firstname:"",
  //     lastname:"",
  //     pets:"",
  //     phone:"",
  //     email:"",
  //     password:""
      
  //   })
  // const {firstname, lastname, pets,phone, email, password } = newClient
  // const handleChange = e =>
  //   setNewClient({ ...newClient, [e.target.name]: e.target.value }); 

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


const setAuth = boolean => {
  setIsAuthenticated(boolean);
}
// ___CREATE PROFILE

const createProfile = async (event)=>{
  event.preventDefault();

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


//   axios.post("http://localhost:5000/signup",{
//         firstname: firstname,
//         lastname: lastname,
//         pets: pets,
//         phone: phone,
//         email: email, 
//         password: password

//   } ).then(
//     (response) => {
//         setClients(response.data)
//         setIsAuthenticated(true)
//     }
// )
// }

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
    <Link to="/login">Login</Link>|{""}
    <Link to="/">Main</Link>
</div>
        </>
    )
}


export default SignUp