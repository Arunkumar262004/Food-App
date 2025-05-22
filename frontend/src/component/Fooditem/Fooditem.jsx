import React, { useContext } from 'react';
import './Fooditem.css';
import { assets } from "../../assets/assets";
import { StoreContext } from '../../context/Storecontext';
import { Link, useNavigate } from 'react-router-dom';

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, removeItemFromCart, addToCart, url } = useContext(StoreContext);


  const navigate = useNavigate();



  return (
    <div className='food-item'>
      <Link to={`/viewproduct/${id}`} className="food-item-image-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeItemFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItems[id]}</p>
            <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add More" />
          </div>
        )}
      </Link>
      <div className="food-iteminfo">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
