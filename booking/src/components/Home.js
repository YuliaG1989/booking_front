import {React, useState, useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'



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
    const Logout = () => {
      setIsAuthenticated(false) 
      localStorage.removeItem("token")
    };

  useEffect(() => {
    getCurrentClient();
  }, []);
  
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
        </>
    )
}


export default Home;