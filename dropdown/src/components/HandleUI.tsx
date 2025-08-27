import { useState } from "react";
import Auth from "../Authentication/Auth";
import Register from "../Authentication/Register";
import Dashboard from "./Dashboard";

const HandleUI = () => {
   const [isLogin,setIsLogin] = useState<boolean>(false);
    const [authMode, setAuthMode] = useState<"login" | "register">("login");

  return (
    <div>
      {isLogin ?(
          <Dashboard isLogin={isLogin} setIsLogin={setIsLogin}/>
      )   
      :
      authMode == "login" ?
      <Auth setIsLogin={setIsLogin} />
      :
      <Register/>
      }
       {!isLogin && (
      <button
        style={{ marginTop: "10px" }}
        onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
      >
        {authMode === "login" ? "Go to Register" : "Go to Login"}
      </button>
    )}
    </div>
  )
}

export default HandleUI
