import React from "react";
import { Link } from "react-router-dom";
import "./GigCard.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const GigCard = ({ item }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await newRequest.get(`user/${item.userId}`);
      return res.data;
    },
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src= {item.cover || "https://danrich.co/wp-content/uploads/2021/10/fiverr-gig-title-examples-and-ideas.jpg"} alt="" className="dark" />
        <div className="info">
          <div className="user">
            {isLoading ? (
              "Loading..."
            ) : error ? (
              "Something went wromg"
            ) : (
              <img src={data.img || "./images/noavatar.png"} alt="" className="dark"/>
            )}
            {isLoading ? (
              "Loading..."
            ) : error ? (
              "Something went wromg"
            ) : (
              <span>{data.username}</span>
            )}
          </div>
          <p>{item.shortDesc}</p>
          <div className="star">
            <img src="./images/star.png" alt="" />
            <span>{ Math.round(item.totalRating / item.starRating )}</span>
          </div>
        </div>
        <hr />
        <div className="details">
          <img src="./images/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2> ₹ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
