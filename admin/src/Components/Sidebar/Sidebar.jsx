import React from 'react'
import { assets } from '../../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    window.location.reload()
  }

  return (
    <>
      <style>{`
        .sidebar {
         width: 200px;
  height: 100%;
          background: #ffffff;
          border-right: 1px solid #f0f0f0;
          padding-top: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
        .sidebar-bottom {
          padding: 12px;
          border-top: 1px solid #f0f0f0;
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          border-radius: 8px;
          border: 1px solid transparent;
          background: transparent;
          color: #555555;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .logout-btn p {
          margin: 0;
        }
        .logout-btn:hover {
          background: #fff0f0;
          color: #e53935;
          border-color: #ffd4d4;
        }
        @media (max-width: 1024px) {
          .sidebar {
            width: 60px;
          }
          .sidebar-option p,
          .logout-btn p {
            display: none;
          }
          .sidebar-option {
            justify-content: center;
            padding: 12px;
          }
          .logout-btn {
            justify-content: center;
            padding: 12px;
          }
          .sidebar-option img {
            width: 22px;
            height: 22px;
          }
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

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar