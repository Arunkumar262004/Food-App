import React, { useState, useContext } from 'react'
import './Login_popup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios'

const Login_popup = ({ setShowLogin }) => {

  const { url,setToken } = useContext(StoreContext)


  const [currState, setCurrstate] = useState("Sign Up")

  const [data, SetData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    SetData(data => ({ ...data, [name]: value }))
  }

  const onlogin = async (event) => {

    event.preventDefault();

    let newurl = url;
    if (currState === "Login") {
      newurl += "/api/user/login"
    }else{
      newurl += "/api/user/register"
    }


    const response = await axios.post(newurl,data)

    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popp-inputs">
          {currState === "Login" ? <></> : <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='Enter your Name' required />}
          <input onChange={onChangehandler} name='email' value={data.email} type="email" placeholder='Enter your Email' required />
          <input onChange={onChangehandler} name='password' value={data.password} type="password" placeholder='Enter your Password' required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create Accont" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Clicking here You Accept the Terms & Condition</p>
        </div>
        {currState === "Login" ?
          <p>Create a new Account? <span onClick={() => { setCurrstate("Sign Up") }}>Click here</span></p> :
          <p>Already have an Account? <span onClick={() => { setCurrstate("Login") }}>Login here</span></p>
        }

      </form>
    </div>
  )
}

export default Login_popup
