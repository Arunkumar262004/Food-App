import React, { useState } from 'react'
import './Login_popup.css'
import { assets } from '../../assets/assets'
const Login_popup = ({ setShowLogin }) => {
  const [currState, setCurrstate] = useState("Sign Up")
  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popp-inputs">
          {currState === "Login" ? <></> : <input type="text" placeholder='Enter your Name' required />}
          <input type="email" placeholder='Enter your Email' required />
          <input type="password" placeholder='Enter your Password' required />
        </div>
        <button>{currState === "Sign Up" ? "Create Accont" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Clicking here You Accept the Terms & Condition</p>
        </div>
        {currState === "Login" ?
          <p>Create a new Account? <span onClick={()=>{ setCurrstate("Sign Up")}}>Click here</span></p> :
          <p>Already have an Account? <span onClick={()=>{ setCurrstate("Login")}}>Login here</span></p>
        }

      </form>
    </div>
  )
}

export default Login_popup
