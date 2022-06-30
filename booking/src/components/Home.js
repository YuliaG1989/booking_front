import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";




const Home = ()=>{


const [currentClient, setCurrentClient]= useState()
   

    const [isAuthenticated, setIsAuthenticated] = useState(true)
  
 // ___FETCH CLIENTS
    const getCurrentClient = async () => {
      try {
        const res = await fetch("http://localhost:5000/home/", {
          method: "GET",
          headers: { token: localStorage.token}
        });
  
        const parseRes = await res.json();
        console.log(parseRes.firstname);
        setCurrentClient(parseRes.firstname);
      } catch (err) {
        console.error(err.message);
      }
    };

    //____LOGOUT
    const Logout = (e) => {

      e.preventDefault();
  
      localStorage.removeItem("token");
      
    };

  useEffect(() => {
    getCurrentClient();
  }, []);
  
    return(
        <>
        <h1>Home</h1>
        <h1>Welcome, {currentClient}  </h1>
           

         
       
        <button onClick={Logout}>LogOut</button>
        <Link to="/">Main</Link>
        
        </>
    )
}


export default Home;