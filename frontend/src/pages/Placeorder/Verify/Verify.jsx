import React from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useContext } from 'react';
import { StoreContext } from '../../../context/Storecontext';
import { useEffect } from 'react';
import axios from 'axios';



const Verify = () => {



    const [searchParams, setSearchparams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verfiyPayment = async () => {
        const response = await axios.post(url + "/api/order/verify", { success, orderId });
        if (response.data.success) {
            navigate("myorders")
        } else {
            navigate("/");
        }
       
    }


useEffect(()=>{
    verfiyPayment();
})


 return (
            <div className='verify'>
                <div className="spinner"></div>

            </div>
        )
}
    export default Verify
