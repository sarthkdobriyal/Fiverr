import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import CheckoutForm from '../../components/checkoutForm/CheckoutForm.jsx'


const stripePromise = loadStripe("pk_test_51MiNbrSFknHmPFGp9ag8i5nme5qJqyx2Utxck2Y5FXGooiSX2fJ2vetnbAE7ERNlh7wtOyoEhpPjUZBKP5jZ2MMs00ikn0amzk");


const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const id = useParams()

    useEffect(() => {
      const makeRequest = async () => {

        try{
          const res = await newRequest.post(`order/create-payment-intent/${id.id}`)
          setClientSecret(res.data.clientSecret);
          
        }catch(err){
          console.log(err)
        }
      }

      makeRequest();
    
    }, []);

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };  
    

    return (
        <div className="pay">
         {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
        </div>
    )
}

export default Pay;