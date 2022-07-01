import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios'


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
        
        <h1>Welcome, {currentClient} !</h1>
        
        
        <Container>
       <Button   variant="contained" onClick={Logout}> LogOut</Button>
       {!isAuthenticated ? <Navigate to="/"/>: null}
       <Link to="/">
      <Button variant="contained"> Main Page </Button>
      </Link>
      </Container>
      
      {clients.map((getOne) =>{
        if(getOne.id === currentClientID){
      return(
        
        <div className='clients' key={getOne.id}>
      
        <h2> Name: {getOne.firstname}</h2>
        <h2> Last name: {getOne.lastname}</h2>
        <h2> Pets: {getOne.pets}</h2>
        <h2> Email: {getOne.email}</h2>
        <h2> Phone: {getOne.phone}</h2>
        <details>
          <summary>Update</summary>
          <form onSubmit = {updateProfile} id={getOne.id}>
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
    </form>
<button onClick={deleteProfile} value={getOne.id}>DELETE</button>
        </details>
        </div>

      )}

    })}
        </>
    )
}


export default Home;