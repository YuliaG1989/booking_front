import './App.css';
import {React, useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [clients, setClients] = useState([])
  const [firstname, setFirstName] = useState()
  const [lastname, setLastName] = useState()
  const [pets, setPets] = useState([])
  const[email, setEmail] = useState()
  const [phone, setPhone] = useState()
//___FETCH CLIENTS
const getClients = () =>{
  axios.get("http://localhost:5000").then(response =>{
    setClients(response.data)
  })
} 

useEffect(() => {
  getClients();
}, []);


//___CREATE PROFILE

const createProfile = (event)=>{
  event.preventDefault();
  axios.post("http://localhost:5000/",{
        firstname: firstname,
        lastname: lastname,
        pets: pets,
        email: email, 
        phone: phone

  } ).then(
    (response) => {
        setClients(response.data
        )
    }
)
}

//____UPDATE PROFILE
 const updateProfile = (event) => {
  event.preventDefault();
  
  axios.put( "http://localhost:5000/" + event.target.id,
         {
    firstname: firstname,
    lastname: lastname,
    pets: pets,
    email: email, 
    phone: phone 
         }).then(
      (response) => {
          setClients(response.data)
      }
  )
}
//____DELETE PROFILE

const deleteProfile = (event) => {
  axios.delete("http://localhost:5000/" + event.target.value).then(
      (response) => {
          setClients(
             response.data
          )
      }
  )

}
  return (
    <>
    <h1>The Great Catsby</h1>

    <form onSubmit = {createProfile}>
      <label>First Name</label>
      <input type='text' placeholder='First Name' onChange= {e=> setFirstName(e.target.value)}/><br/>
      <label>Last Name</label>
      <input type='text' placeholder='Last Name' onChange= {e=> setLastName(e.target.value)}/><br/>
      <label>Pets</label>
      <input type='text' placeholder='Pets' onChange= {e=> setPets(e.target.value)}/><br/>
      <label>Email</label>
      <input type='text' placeholder='Email' onChange= {e=> setEmail(e.target.value)}/><br/>
      <label>Phone</label>
      <input type='number' placeholder='Phone' onChange= {e=> setPhone(e.target.value)}/><br/>
      <input type= 'submit' value='Submit'/>
    </form>


    {clients.map((getOne) =>{
      return(
        <div key={getOne.id}>
        
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
      <label>Phone</label>
      <input type='number' placeholder='Phone' onChange= {e=> setPhone(e.target.value)}/><br/>
      <input type= 'submit' value='Submit'/>
    </form>
<button onClick={deleteProfile} value={getOne.id}>DELETE</button>
        </details>
        </div>

      )
    })}
    </>
  );
}

export default App;
