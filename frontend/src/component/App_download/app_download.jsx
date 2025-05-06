import React from 'react';
import './Appdownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>
        For a Better Experience <br />
        Download the Tomato App
      </p>
      <div className="app-download-platform">
        <img src={assets.play_store} alt='Google Play Store' />
        <img src={assets.app_store} alt='Apple App Store' />
      </div>
    </div>
  );
};

export default AppDownload;
