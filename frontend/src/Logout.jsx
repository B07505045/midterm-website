import React from 'react'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import services from './services'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const cookieUser = Cookies.get("username");
  const handleLogout = (event) =>{
    services.user.logout(cookieUser).then((data) => {
        console.log(data)
        alert("Successfully Logged Out")
        navigate("/Login"); 
        window.location.reload(false);
    }).catch(err=>{console.log("Log out error", err)});  
    event.preventDefault();
  }

  return (
    <>
    <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
    <h2>{cookieUser}, Confirm to logout</h2>
    <button onClick={handleLogout} style={{width:"400px", height:"30px", marginTop:"20px", padding:"1px", background:"purple", color:"white"}}
    >Confirm</button>
    </>
  )
}

export default Logout;