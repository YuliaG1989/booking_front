import{ React} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useState } from 'react';
import Store from './components/Store'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   
  <BrowserRouter>
  
  <Routes>
    <Route path="/" element={<App />} />
    <Route exact path="/login" element={<Login />}  />
    <Route exact path="/signup" element={<SignUp/>}/>
    <Route exact path="/home" element={<Home />} />
    {/* <Route exact path="/store" element={<Store />}/> */}
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
