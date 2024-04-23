import React, { useState, useEffect }from 'react'
import services from './services'
import Cookies from "js-cookie";

export const Dashboard = () => {
    const [name, setName] = useState("");
    const cookieUser = Cookies.get("username");
    const [dt, setDt] = useState([]);
    const [post, setPost] = useState("");
    useEffect(() => {
        services.user.getPost().then((data) => {
          setDt(data);
          }).catch(err=>{console.log("Get post error", err)}); 
        setName(cookieUser)
      });

  const handlePost = ()=> {
    console.log(name)
    console.log(post)
    services.user.createOnePost(name,post).then((data) => {
        setDt(data)
        }
      ).catch(err=>{console.log("Create post error", err)});  
  }

  const handleDeletePost = (id)=> {
    services.user.deletePost(id).then((data) => {
        setDt(data)
        }
      ).catch(err=>{console.log("Create post error", err)});  
  }

  return (
    <>
      {cookieUser&&<><input id="post" placeholder='Say something...' style={{padding:"3px", width:"400px", height:"30px"}} onChange={(e)=>{setPost(e.target.value);}}/>
        <button onClick={handlePost}>Post</button></>}
        
        {dt.map((dt) => 
            <div className="post" key={dt.id}>
              <div>
                <img src={dt.authorIcon} className='postIcon'/>
                <div className='content'>{dt.authorName}#{dt.id}</div>
              </div>
              <div className='content'>{dt.content}</div>
              {cookieUser===dt.authorName&&<button onClick={()=>{handleDeletePost(dt.id)}} className='delPost'>x</button>}
            </div>
            )
        }
    </>
  )
  }
export default Dashboard;
