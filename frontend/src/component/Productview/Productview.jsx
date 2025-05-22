import React, { useContext, useEffect, useState } from 'react'
import './Productview.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/Storecontext';


const Productview = () => {
    const { cartItems, removeItemFromCart, addToCart } = useContext(StoreContext);
  
  const url = "http://localhost:4000"
  const [foodId, setFoodid] = useState(null)

  const { id } = useParams();

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
  }, [id])



  return (
    <div className='container mt-5'>
      {foodId ? (
        <div className=' d-flex row product_img '>
          <div className='col-md-4 product_img'>
            <img
              src={url + "/images/" + foodId.image}
              alt={foodId.name}
              className="img-fluid"
            />
          </div>
          <div className='col-md-8 mt-4'>
            <h2>{foodId.name}</h2>
            <p className='text'>242 Ratings & 23 Reviews</p>
            <span className='text-success badge badge-success'>Special price</span>

           <h2>₹{foodId.price}</h2>
            <div className='row div_shop_btn'>

              <div className='col-md-5'><Link to={"/order"}  className='btn btn-warning w-50'>Buy Now</Link></div>
              <div className='col-md-5 color-white div_shop_btn_sec'><a onClick={()=>addToCart(id)} className='btn btn-warning w-50 ' >Add To Cart</a></div>
              

            </div>


            <div className='col-md-12 mt-3'>

              <p>{foodId.description}</p>
              <p>{foodId.category}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )


}

export default Productview
