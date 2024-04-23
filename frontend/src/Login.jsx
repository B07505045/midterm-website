import React from 'react'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import services from './services'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const cookieUser = Cookies.get("username");
  const navigate = useNavigate();
  if (cookieUser){navigate("/"); }
  const [user,setUser] = useState();
  const [passwd,setPasswd] = useState();
  

  const handleLoginSubmit = () =>{
    console.log(user, passwd)
    services.user.login(user, passwd).then((data) => {
        console.log(data)
        alert("Successfully Logged In")
        document.getElementById('enterUser').value = ''
        document.getElementById('enterPasswd').value = ''
        navigate("/"); 
        window.location.reload(false);
    }).catch(err=>{alert(JSON.stringify(err.response.data.error, null, 2))});  
  }

  const togglePasswd = () =>{
    var x = document.getElementById("enterPasswd");
    if (x.type === "password") {x.type = "text";} 
    else {x.type = "password";}
  }

  return (
    <>
    {!cookieUser&&<>
    <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
    <h2>Login</h2>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    <input id="enterUser" placeholder='Enter username' style={{padding:"3px", width:"400px", height:"30px"}} onChange={(e)=>setUser(e.target.value)}/>
    <input id="enterPasswd" type="password" placeholder='Enter password' style={{padding:"3px", width:"400px", height:"30px", marginTop:"20px"}} onChange={(e)=>setPasswd(e.target.value)}/>
    <div style={{display:"flex"}}>
      <input type="checkbox" id= "checkPasswd" onClick={togglePasswd}/>
      <label htmlFor="checkPasswd">Show Password</label>
    </div>
    <button onClick={handleLoginSubmit} style={{width:"400px", height:"30px", marginTop:"20px", padding:"1px", background:"purple", color:"white"}}
    >Submit</button>
    </div>
    </>}
    {cookieUser&&<div>Already Logged In
    </div>}
    </>
  )
}

export default Login;