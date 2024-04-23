import React, { Component, useEffect, useState } from 'react'
import {Link} from "react-router-dom";
import './Styles/Nav.css';
import Cookies from "js-cookie";

export const Navbar = ()=>{
  const cookieUser = Cookies.get("username");
        return (
            <div className="nav">
              <Link to="/" ><div>Home</div></Link>
              <Link to="/About" style={{textDecoration:"none"}}><div>About</div></Link>
              <Link to="/Users" style={{textDecoration:"none"}}><div>Users</div></Link>
              <Link to="/CreateUsers" style={{textDecoration:"none"}}><div>Create User</div></Link>
              <Link to="/Dashboard" style={{textDecoration:"none"}}><div>Dashboard</div></Link>
              <Link to="/AI" style={{textDecoration:"none"}}><div>AI</div></Link>
              {cookieUser&&<Link to="/Logout" style={{textDecoration:"none"}}><div>Logout</div></Link>}
              {!cookieUser&&<Link to="/Login" style={{textDecoration:"none"}}><div>Login</div></Link>}
            </div>  
        )
    
}

export default Navbar;