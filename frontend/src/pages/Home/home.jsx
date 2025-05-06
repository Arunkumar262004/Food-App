import React, { useState } from 'react'
import './home.css'
import Header from '../../component/Header/Header'
import Explorer from '../../component/Explorermenu/Emplorer'
import Fooddisplay from '../../component/fooddisplay/Fooddisplay'

import App_download from '../../component/App_download/app_download.jsx'

const home = () => {

  const [Category,Setcategory] = useState("All")
  return (
    <div>
      <Header />
      <Explorer Category={Category} Setcategory={Setcategory}/>
      <Fooddisplay Category={Category}/>
      <App_download/>
    </div>
  )
}

export default home
