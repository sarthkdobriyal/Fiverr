import React,{useEffect} from 'react'
import './Success.scss'
import {useNavigate, useLocation} from 'react-router-dom'
import newRequest from "../../utils/newRequest.js";

const Success = () => {


    const navigate = useNavigate();
    const {search } = useLocation();
    const params =new URLSearchParams(search);
    const payment_intent = params.get("payment_intent");
    
    useEffect(() => {
        const makeRequest = async() => {
            try{
                await newRequest.put('order',{payment_intent})
                setTimeout(() => {
                    navigate("/orders")
                }, 5000)
                
            }catch(err){

            }
        }
        makeRequest();
    })

    return (
        <div className="success">
        <h1>
            Payment Successful.
        </h1>
        <p>
            Redirecting you to Orders page.Please do not close the page.
            Otherwise click below
        </p>
        <p onClick={navigate("/orders")}>Orders</p>
        </div>
    )
}

export default Success