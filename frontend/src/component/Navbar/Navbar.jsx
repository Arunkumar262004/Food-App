import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'

const Navbar = ({ setShowLogin }) => {

  const [menu, Setmenu] = useState("")

  const { get_total_Cart_amount, token, setToken } = useContext(StoreContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => { Setmenu("home") }} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-Menu' onClick={() => { Setmenu("Menu") }} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => { Setmenu("Mobile-App") }} className={menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
        <a href='#footer' onClick={() => { Setmenu("Contact") }} className={menu === "Contact" ? "active" : ""}>Contact</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={get_total_Cart_amount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => { setShowLogin(true) }}>Sign Up</button> :
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" />Orders</li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" />Logout</li>
            </ul>
          </div>}

      </div>
    </div>
  )
}

export default Navbar
