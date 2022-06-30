import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
const Home = ()=>{
const [currentClient, setCurrentClient]= useState()
    // ___FETCH CLIENTS

    // const [isAuthenticated, setIsAuthenticated] = useState(false)
  

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
  // const logout = async e => {
  //   e.preventDefault();
  //   try {
  //     localStorage.removeItem("token");
  //     setIsAuthenticated

  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    getCurrentClient();
  }, []);
  
    return(
        <>
        <h1>Home</h1>
<h1>Welcome, {currentClient}  </h1>
           

         
       

        <Link to="/">Main</Link>
        
        </>
    )
}


export default Home;