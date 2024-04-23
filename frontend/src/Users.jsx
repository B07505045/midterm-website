import React from 'react'
import { useState, useEffect } from 'react'
import services from './services'
import "./Styles/User.css"
export const Users = () => {
  const [dt, setDt] = useState([]);
  useEffect(() => {
    services.user.getAll().then((data) => {
      setDt(data);
      }).catch(err=>{console.log("Get user error", err)}); 

  });
    
  return (
    <>
    <div className='userContainer'>
    {dt.map((dt) => 
    <div className="userInfo" key={dt.id}>
      <img src={dt.icon} className='icon'/>
      <div className='name'>{dt.name}</div>
    </div>
    )
    }
    </div>
    </>
  )
}

export default Users