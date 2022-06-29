import {React, useState,  useEffect} from 'react'
import { Link, Navigate } from "react-router-dom";

import { toast } from "react-toastify";
const Login = ()=>{
    const [currentClient, setCurrentClient] = useState()
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
      });

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const setAuth = boolean => {
      setIsAuthenticated(boolean);
    }
      const { email, password } = inputs;
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { email, password };
          const response = await fetch(
            "http://localhost:5000/login",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
    
          const parseRes = await response.json();
    
          if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            toast.success("Logged in Successfully");
          } else {
            setAuth(false);
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
    return(
        <>
        <h1>Login</h1>
        { !isAuthenticated ? 
        <form onSubmit ={onSubmitForm} >
            <label>Email</label>
            <input type="text" name = 'email' placeholder="Email"onChange={e=>onChange(e)}></input><br/>
            <label>Password</label>
            <input type="password" name = 'password' placeholder="Password" onChange={e=>onChange(e)}></input><br/>
            <input type="submit" value = "Login"></input>
        </form>
        : <Navigate to="/home"/>}
        <Link to="/signup">Sign Up</Link>|{" "}
        </>
    )
}


export default Login;