import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
const Home = (props)=>{

    // ___FETCH CLIENTS


//   const getProfile = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/", {
//         method: "GET",
//         headers: { token: localStorage.token }
//       });

//       const parseData = await res.json();
      
//       setCurrentClient(parseData.firstname);
//       console.log(currentClient)
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const logout = async e => {
//     e.preventDefault();
//     try {
//       localStorage.removeItem("token");
//       setAuth(false);
//       toast.success("Logout successfully");
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   useEffect(() => {
//     getProfile();
//   }, []);
  
    return(
        <>
        <h1>Home</h1>
    <h2>{props.currentClient}</h2>
           

         
       

        <Link to="/">Main</Link>
        </>
    )
}


export default Home;