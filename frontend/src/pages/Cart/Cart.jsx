import React, { useContext } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';

import { StoreContext } from '../../context/Storecontext'
const Cart = () => {
  const navigate = useNavigate();

  const { cartItems, food_list, removeItemFromCart, get_total_Cart_amount, url } = useContext(StoreContext);


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0)
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt='' />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeItemFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>

            )
        })}
      </div>
      <div className="cart-bottom">
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
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have promo code Enter it here</p>
            <div className="cart-promo-code-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
