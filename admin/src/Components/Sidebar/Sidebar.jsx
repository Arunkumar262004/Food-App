import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-opions">
            <Link to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </Link>
            <Link to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </Link>
            <Link to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </Link>
        </div>

    </div>
  )
}

export default Sidebar
