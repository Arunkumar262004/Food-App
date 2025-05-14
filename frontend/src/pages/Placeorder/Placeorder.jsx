import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Placeorder = () => {
  const { get_total_Cart_amount, token, cartItems, url,food_list } = useContext(StoreContext)


  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const Onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items: orderItems,
      amount:get_total_Cart_amount() +2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})

    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      alert("Error in placing order")
    }
  }

  const navigate = useNavigate();

  useEffect(()=>{
if(!token){
navigate('/cart')
}else if (get_total_Cart_amount() === 0 ){
  navigate('/cart')
}
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fieldds">
          <input required onChange={Onchangehandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input required onChange={Onchangehandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required onChange={Onchangehandler} name='email' value={data.email} type="text" placeholder='Email Address' />
        <input required onChange={Onchangehandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="multi-fieldds">
          <input required onChange={Onchangehandler} name='city' value={data.city} type="text" placeholder='City' />
          <input required onChange={Onchangehandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fieldds">
          <input required onChange={Onchangehandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip' />
          <input required onChange={Onchangehandler} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input required onChange={Onchangehandler} name='phone' value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals </h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${get_total_Cart_amount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${get_total_Cart_amount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${get_total_Cart_amount() === 0 ? 0 : get_total_Cart_amount() + 2}</p>
            </div>

          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
