import React, { useContext } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../context/Storecontext'
const Placeorder = () => {
  const {get_total_Cart_amount}= useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fieldds">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="text" placeholder='Email Address'/>
        <input type="text" placeholder='State'/>
        <div className="multi-fieldds">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fieldds">
          <input type="text" placeholder='Zip' />
          <input type="text" placeholder='Country' />
        </div>
        <input type='text' placeholder='Phone'/>
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
              <p>${get_total_Cart_amount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${get_total_Cart_amount()===0?0:get_total_Cart_amount()+2}</p>
            </div>
            
          </div>
          <button >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
