import React, { useContext, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext'
import { assets } from '../../assets/assets'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownTimer = useRef(null)
  const { get_total_Cart_amount, token, setToken } = useContext(StoreContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
    setDropdownOpen(false)
  }

  const handleScrollNav = (sectionId, menuName) => {
    setMenu(menuName)
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const openDropdown = () => {
    clearTimeout(dropdownTimer.current)
    setDropdownOpen(true)
  }

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 120)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .fnb-nav {
          position: sticky;
          top: 0;
          z-index: 9999;
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          border-bottom: 1px solid #f0ebe3;
        }

        /* Top accent bar */
        .fnb-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #ff6b35 0%, #f7931e 40%, #ffcd3c 100%);
        }

        .fnb-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        /* ── LOGO ── */
        .fnb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .fnb-logo img {
          height: 40px;
          object-fit: contain;
        }

        /* ── NAV LINKS ── */
        .fnb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .fnb-link {
          position: relative;
          font-size: 14.5px;
          font-weight: 500;
          color: #5a5047;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          background: none;
          font-family: inherit;
          letter-spacing: 0.01em;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .fnb-link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: calc(100% - 24px);
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #ff6b35, #f7931e);
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1);
        }
        .fnb-link:hover { color: #ff6b35; background: #fff8f4; }
        .fnb-link:hover::after { transform: translateX(-50%) scaleX(1); }
        .fnb-link.active { color: #ff6b35; font-weight: 600; }
        .fnb-link.active::after { transform: translateX(-50%) scaleX(1); }

        /* ── RIGHT SIDE ── */
        .fnb-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        /* icon buttons */
        .fnb-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #faf8f5;
          border: 1.5px solid #f0ebe3;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s;
          text-decoration: none;
          position: relative;
        }
        .fnb-icon-btn:hover {
          background: #fff8f4;
          border-color: #ffd6bc;
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(255,107,53,0.12);
        }
        .fnb-icon-btn img {
          width: 19px;
          height: 19px;
          object-fit: contain;
          opacity: 0.7;
        }
        .fnb-icon-btn:hover img { opacity: 1; }

        /* cart badge */
        .fnb-cart-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          min-width: 18px;
          height: 18px;
          border-radius: 9px;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: white;
          font-family: 'DM Sans', sans-serif;
        }

        /* sign-in button */
        .fnb-signin {
          padding: 9px 22px;
          background: #fff8f4;
          color: #ff6b35;
          border: 1.5px solid #ffd6bc;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.18s;
          letter-spacing: 0.01em;
        }
        .fnb-signin:hover {
          background: #fff0e8;
          border-color: #ff6b35;
          transform: translateY(-1px);
        }

        .fnb-signup {
          padding: 9px 22px;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.18s;
          box-shadow: 0 3px 12px rgba(255,107,53,0.28);
          letter-spacing: 0.01em;
        }
        .fnb-signup:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255,107,53,0.38);
        }

        /* ── PROFILE DROPDOWN ── */
        .fnb-profile { position: relative; }

        .fnb-profile-btn {
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s;
          box-shadow: 0 3px 10px rgba(255,107,53,0.3);
        }
        .fnb-profile-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(255,107,53,0.4);
        }
        .fnb-profile-btn img {
          width: 20px;
          height: 20px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        /* Dropdown — fixed with pointer-events bridge */
        .fnb-dropdown-wrap {
          position: absolute;
          top: calc(100% + 4px);
          right: 0;
          padding-top: 8px; /* bridge gap so mouse doesn't escape */
          z-index: 9999;
        }
        .fnb-dropdown {
          background: white;
          border-radius: 16px;
          box-shadow:
            0 4px 6px rgba(0,0,0,0.04),
            0 12px 40px rgba(0,0,0,0.12),
            0 0 0 1px rgba(0,0,0,0.05);
          padding: 6px;
          min-width: 190px;
          animation: fnbDropIn 0.18s cubic-bezier(.34,1.56,.64,1);
        }
        @keyframes fnbDropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .fnb-dropdown-header {
          padding: 10px 12px 8px;
          border-bottom: 1px solid #f5f0eb;
          margin-bottom: 4px;
        }
        .fnb-dropdown-header-label {
          font-size: 11px;
          font-weight: 600;
          color: #b0a090;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .fnb-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #3d3028;
          transition: all 0.15s;
          font-family: inherit;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
        }
        .fnb-dd-item:hover { background: #fff8f4; color: #ff6b35; }
        .fnb-dd-item .fnb-dd-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #faf8f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .fnb-dd-item:hover .fnb-dd-icon { background: #fff0e8; }
        .fnb-dd-icon img { width: 15px; height: 15px; object-fit: contain; opacity: 0.6; }
        .fnb-dd-item:hover .fnb-dd-icon img { opacity: 1; }

        .fnb-dd-item.danger { color: #e53e3e; }
        .fnb-dd-item.danger:hover { background: #fff5f5; color: #c53030; }
        .fnb-dd-item.danger .fnb-dd-icon { background: #fff5f5; }
        .fnb-dd-item.danger:hover .fnb-dd-icon { background: #fed7d7; }

        .fnb-dd-hr { height: 1px; background: #f5f0eb; margin: 4px 0; border: none; }

        /* ── DIVIDER ── */
        .fnb-vdivider {
          width: 1px;
          height: 24px;
          background: #f0ebe3;
          margin: 0 4px;
        }
      `}</style>

      <div className="fnb-accent-bar" />
      <nav className="fnb-nav">
        <div className="fnb-inner">

          {/* Logo */}
          <Link to='/' className="fnb-logo" onClick={() => setMenu("home")}>
            <img src={assets.logo} alt="Logo" />
          </Link>

          {/* Nav Links */}
          <ul className="fnb-links">
            <Link
              to='/'
              className={`fnb-link ${menu === "home" ? "active" : ""}`}
              onClick={() => setMenu("home")}
            >
              Home
            </Link>
            <span
              className={`fnb-link ${menu === "Menu" ? "active" : ""}`}
              onClick={() => handleScrollNav('explore-Menu', 'Menu')}
            >
              Menu
            </span>
            <span
              className={`fnb-link ${menu === "Mobile-App" ? "active" : ""}`}
              onClick={() => handleScrollNav('app-download', 'Mobile-App')}
            >
              Mobile App
            </span>
            <span
              className={`fnb-link ${menu === "Contact" ? "active" : ""}`}
              onClick={() => handleScrollNav('footer', 'Contact')}
            >
              Contact
            </span>
          </ul>

          {/* Right Side */}
          <div className="fnb-right">

            {/* Search */}
            <button className="fnb-icon-btn" aria-label="Search">
              <img src={assets.search_icon} alt="Search" />
            </button>

            {/* Cart */}
            <Link to='/cart' className="fnb-icon-btn" aria-label="Cart">
              <img src={assets.basket_icon} alt="Cart" />
              {get_total_Cart_amount() > 0 && (
                <span className="fnb-cart-badge">
                  {/* optional: show count if available */}
                </span>
              )}
            </Link>

            <div className="fnb-vdivider" />

            {/* Auth */}
            {!token ? (
              <button className="fnb-signup" onClick={() => setShowLogin(true)}>
                Sign in
              </button>
            ) : (
              <div
                className="fnb-profile"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button className="fnb-profile-btn" aria-label="Profile">
                  <img src={assets.profile_icon} alt="Profile" />
                </button>

                {dropdownOpen && (
                  <div
                    className="fnb-dropdown-wrap"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <div className="fnb-dropdown">
                      <div className="fnb-dropdown-header">
                        <div className="fnb-dropdown-header-label">My Account</div>
                      </div>

                      <button className="fnb-dd-item" onClick={() => { navigate('/myorders'); setDropdownOpen(false) }}>
                        <span className="fnb-dd-icon"><img src={assets.bag_icon} alt="" /></span>
                        My Orders
                      </button>

                      <button className="fnb-dd-item" onClick={() => { navigate('/user_settings'); setDropdownOpen(false) }}>
                        <span className="fnb-dd-icon"><img src={assets.menu_1} alt="" /></span>
                        Settings
                      </button>

                      <hr className="fnb-dd-hr" />

                      <button className="fnb-dd-item danger" onClick={logout}>
                        <span className="fnb-dd-icon"><img src={assets.logout_icon} alt="" /></span>
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar