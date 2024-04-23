import React from 'react'
import { useState, useEffect } from 'react'
import viteLogo from '/vite.svg'
import services from './services'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const CreateUsers = () => {

  const [user,setUser] = useState("");
  const [passwd,setPasswd] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const cookieUser = Cookies.get("username");
  const navigate = useNavigate();

  const handleSubmit = () =>{
    if (user == ""){alert("Please input user");return}
    if (passwd == ""){alert("Please input password");return}
    if (selectedImage == null){alert("Please upload image");return}

    services.user.add(user, passwd, selectedImage).then((data) => {
      if (data.name === user){
        alert("Successfully Added User")
        document.getElementById('addUser').value = ''
        document.getElementById('addPasswd').value = ''
        document.getElementById('addIcon').value = null
        setSelectedImage(null)
        navigate("/Login");

      }
    }).catch(err=>{
      alert(JSON.stringify(err.response.data.error, null, 2));
      console.log("Create user error", err)});  
  }

  const togglePasswd = () =>{
    var x = document.getElementById("addPasswd");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const handleImgInputChange = (event) => {
    const file = event.target.files[0];
    const img = new Image();
    const reader = new FileReader();
    
    img.onload = () => {
      const resizedImg = resizeImage(img, 100, 100);
      console.log(resizedImg);
      setSelectedImage(resizedImg);
    }
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
  }


  const resizeImage = (image, maxWidth, maxHeight) => {
    const img = image;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL("image/jpeg", 0.7);
  };
  

  return (
    <>{!cookieUser&&<>
    <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
    <h2>Create User</h2>
    <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
    <input id="addUser" placeholder='Enter username' required style={{padding:"3px", width:"400px", height:"30px"}} onChange={(e)=>setUser(e.target.value)}/>
    <input id="addPasswd" type="password" placeholder='Enter password' required style={{padding:"3px", width:"400px", height:"30px", marginTop:"20px"}} onChange={(e)=>setPasswd(e.target.value)}/>
    <div style={{display:"flex"}}>
      <input type="checkbox" id= "checkPasswd" onClick={togglePasswd}/>
      <label htmlFor="checkPasswd">Show Password</label>
    </div>
    <div>
      <label htmlFor="imagePath" className="sr-only">
        Image
      </label>
      <input
        id = "addIcon"
        name="imagePath"
        type="file"
        accept=".jpg,.png"
        required
        className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Image Path"
        onChange={handleImgInputChange}
      />
      {selectedImage && (<img
          className="mx-auto h-50 w-auto"
          alt="Please select an image."
          src={selectedImage}
          />)}
      </div>





    <button onClick={handleSubmit} style={{width:"400px", height:"30px", marginTop:"20px", padding:"1px", background:"purple", color:"white"}}
    >Submit</button>
    </div>
    </>}
    {cookieUser && <div>Logout to create another user</div>}</>
  )
}

export default CreateUsers;