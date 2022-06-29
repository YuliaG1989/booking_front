import {React, useState, useEffect} from 'react'
import axios from 'axios'
const Home = (props)=>{
const [currentClient, setCurrentClient] = useState("")
    // ___FETCH CLIENTS
    const getClient = async () => {
        try {
          const res = await fetch("http://localhost:5000", {
            method: "POST",
            headers: { token: localStorage.token }
          });
    
          const parseData = await res.json();
          setCurrentClient(parseData.firstname);
        } catch (err) {
          console.error(err.message);
        }
      };
    
  
  useEffect(() => {
    getClient();
  }, []);
  
    return(
        <>
        <h1>Home</h1>
        <h2>Hello, {currentClient}</h2>
        </>
    )
}


export default Home;