import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
      <style>{`
        .sidebar {
          width: 200px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #f0f0f0;
          padding-top: 16px;
        }
        .sidebar-options {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 12px;
        }
        .sidebar-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          text-decoration: none;
          color: #555555;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          transition: background 0.15s ease, color 0.15s ease;
          border: 1px solid transparent;
        }
        .sidebar-option p {
          margin: 0;
        }
        .sidebar-option img {
          width: 20px;
          height: 20px;
          opacity: 0.6;
        }
        .sidebar-option:hover {
          background: #fff5f0;
          color: #ff6b35;
        }
        .sidebar-option:hover img {
          opacity: 1;
        }
        .sidebar-option.active {
          background: #fff5f0;
          border-color: #ffd4c2;
          color: #ff6b35;
          font-weight: 600;
        }
        .sidebar-option.active img {
          opacity: 1;
        }
      `}</style>

      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink
            to='/add'
            className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
          >
            <img src={assets.add_icon} alt="Add" />
            <p>Add Items</p>
          </NavLink>

          <NavLink
            to='/list'
            className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
          >
            <img src={assets.order_icon} alt="List" />
            <p>List Items</p>
          </NavLink>

          <NavLink
            to='/orders'
            className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}
          >
            <img src={assets.order_icon} alt="Orders" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar