import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer'; // ✅ Import Footer
import Home from './pages/Home/home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Login_popup from './component/Loginpopup/Login_popup';
import Verify from './pages/Placeorder/Verify/Verify';
import Myorder from './pages/Myorders/Myorder';
import UserSetting from './component/userSetting/userSetting.jsx';
import Productview from './component/Productview/Productview.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
      {showLogin ? <Login_popup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<Myorder />} />
          <Route path='/user_settings' element={<UserSetting />} />
          <Route path='/viewproduct/:id' element={<Productview />} />



        </Routes>

      </div>
      <Footer />
    </>
  );
};

export default App;
