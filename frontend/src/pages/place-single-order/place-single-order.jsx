import React, { useContext, useEffect, useState } from 'react'
import './place-single-order.css'
import { StoreContext } from '../../context/Storecontext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';

const Place_single_order = () => {
    const { token ,url} = useContext(StoreContext)

      const { id } = useParams();


    const [food, setFoodid] = useState(null)

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
     
        let orderData = {
            address: data,
            items: food.name,
            amount: food.price,
        }
        let response = await axios.post(url + "/api/placesingle/get_single_order", orderData, { headers: { token } })

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url)
        } else {
            alert("Error in placing order")
        }
    }

    const navigate = useNavigate();

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
    }, []);


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
            {food ? (
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals </h2>

                        <div>
                            <div className="cart-total-details">
                                <p>Item </p>
                                <p>{food.name}</p>
                            </div>
                            <hr />

                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${food.price}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${food.price === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Total</p>
                                <p>${food.price + 2}</p>
                            </div>

                        </div>

                        <button type='submit'>PROCEED TO PAYMENT</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </form>
    )
}

export default Place_single_order
