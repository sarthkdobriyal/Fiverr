import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyOrders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const MyOrders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate= useNavigate();

  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await newRequest.get(`order`);
      // console.log(res.data);
      return res.data;
    },
  });

  const { data, isLoading, error } = query;

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const conversationId = sellerId + buyerId;
try{

  const res  = await newRequest.get(`conversation/${conversationId}`)
  navigate(`/messages/message/${res.data.id}`)
  
}catch(err){
  if(err.response.status === 404){
    const res  = await newRequest.post(`conversation`, {
      to: (currentUser.isSeller ? buyerId : sellerId),
    });
    navigate(`/messages/message/${res.data.id}`)
  }
}

  }

  return (
    <div className="myorders">
      {isLoading ? (
        "Loading... "
      ) : error ? (
        "Error..."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
            {data ? 
              (data.map((order) => {
                return (
                  <tr key={order._id}>
              <td>
                <img
                  className="image"
                  src={order.img}
                  alt=""
                />
              </td>
              <td>{order.title}</td>
              <td>
                {order.price}
              </td>
              <td>13</td>
              <td>
                <img className="delete" src="/images/message.png" alt=""  onClick={() => handleContact(order)}/>
              </td>
            </tr>
                )
              })): "No orders to show"
            }
            
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
