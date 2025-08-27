import axios from "axios";
import { useState } from "react"

type userType = {
    username:string,
    password:any,
}
interface loginType {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const Auth = ({setIsLogin}:loginType) => {
    const [user,setUser] = useState<userType>({
        username:"",
        password:"",
    });

    const sendData = async ()=>{
        try{
            const req = await axios.post("http://127.0.0.1:8000/api/login/",
            {
                username:user.username,
                password:user.password,
            },{
                headers:{
                    "Content-Type":"application/json",
                }
            }
        )
         console.log(req.data); 
         localStorage.setItem("access_token",req.data.access);
         localStorage.setItem("refresh_token",req.data.refresh);
        setIsLogin(true)
        }catch(e){
            console.log(e);
        }
        
    }


  return (
    <div style={{display:"flex",flexDirection:"column",width:"500px",gap:"10px"}}>
      <input type="text" name="username" placeholder="ENTER UR USERNAME" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}/>
      <input type="text" name="password" placeholder="ENTER UR password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}/>
      <button onClick={sendData}>LOGIN</button>
    </div>
  );
}

export default Auth
