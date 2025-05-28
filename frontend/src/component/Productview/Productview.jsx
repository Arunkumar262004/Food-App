import React, { useContext, useEffect, useState } from 'react';
import './Productview.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/Storecontext';
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';





const Productview = () => {
  const { cartItems, removeItemFromCart, addToCart } = useContext(StoreContext);
  const { id } = useParams();
  const [foodId, setFoodid] = useState(null);
  const url = "http://localhost:4000";

  const place_single_order = axios.post(url+"/api/placesingle",)
  
  useEffect(() => {
    const fetch_food_id = async () => {
      try {
        const response = await axios.get(`${url}/api/food/getid/${id}`);
        setFoodid(response.data.dataid);
      } catch (err) {
        console.error("Error fetching food:", err);
      }
    };
    fetch_food_id();
  }, [id]);
  const navigate = useNavigate();

  return (
    <div className='container mt-5'>
      {foodId ? (
        <div className='row'>
          <div className='col-md-4 product_img'>
            <img
              src={`${url}/images/${foodId.image}`}
              alt={foodId.name}
              className="img-fluid"
            />
          </div>

          <div className='col-md-8'>
            <h2>{foodId.name}</h2>

            {!cartItems[id] ? (
              <div className="cart-action-wrapper my-3">
                <p className='add' onClick={() => addToCart(id)} src={assets.add_icon_white}>+</p>
              </div>
            ) : (
              <div className='food-item-counter my-3 d-flex align-items-center'>
                <img onClick={() => removeItemFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                <p className='mx-2 mb-0'>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add More" />
              </div>
            )}

            <div className='mb-3'>
              <p className='text'>242 Ratings & 23 Reviews</p>
              <span className='text-success badge badge-success'>Special price</span>
            </div>

            <h2>₹{foodId.price}</h2>

            <div className='row div_shop_btn my-4'>
              <div className='col-md-5'>
                <button onClick={() => navigate(`/place_single_order/${id} `)} className='btn btn-warning w-100'>Buy Now</button>
              </div>
              <div className='col-md-5'>
                <button onClick={() => addToCart(id)} className='btn btn-warning w-100'>Add To Cart</button>
              </div>
            </div>

            <div className='mt-3'>
              <p>{foodId.description}</p>
              <p>{foodId.category}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Productview;
