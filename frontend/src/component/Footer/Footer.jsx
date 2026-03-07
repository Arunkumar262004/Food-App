import React from 'react'
import "./Footer.css";
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" width={105} height={65} />
          <p>“At our restaurant, food is more than just a meal — it’s an experience. We believe in serving fresh ingredients, authentic flavors, and warm hospitality to every guest who walks through our doors. Every dish is prepared with care, passion, and dedication to quality.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />

          </div>
        </div>
        <div className="footer-content-center">
              <h2>COMPANY</h2>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>

              </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
           <ul>
             <li>+91 9578777764</li>
            <li>arsha.kitchen@gmail.com</li>
           </ul>

        </div>
      </div>
      <hr/>
      <p className="footer-copyright">CopyRight 2026 @ Arsha - All Right Reserved.</p>
    </div>
  )
}

export default Footer
