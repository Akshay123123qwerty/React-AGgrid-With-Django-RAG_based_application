import axios from "axios";
import { useState } from "react"

type userType = {
    username:string,
    password:any,
}


const Register = () => {
    const [user,setUser] = useState<userType>({
        username:"",
        password:"",
    });

    const sendData = async ()=>{
        try {
    const req = await axios.post("http://127.0.0.1:8000/api/register/", {
      username: user.username,
      password: user.password,
    }, {
        headers: { "Content-Type": "application/json" }
      });

    console.log(req.data); 
    alert("Registration successful! Please login.");
  } catch (e) {
    console.error(e);
  }
        
    }


  return (
    <div style={{display:"flex",flexDirection:"column",width:"500px",gap:"10px"}}>
      <input type="text" name="username" placeholder="ENTER UR USERNAME" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
      <input type="text" name="password" placeholder="ENTER UR password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
      <button onClick={sendData}>Register</button>
    </div>
  );
}

export default Register
