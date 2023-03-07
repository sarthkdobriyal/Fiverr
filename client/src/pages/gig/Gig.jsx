import { Slider } from "infinite-react-carousel";
import React from "react";
import "./Gig.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";
import {Link} from 'react-router-dom'

const Gig = () => {
  const { id } = useParams();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["gig"],
    queryFn: async () => {
      const res = await newRequest.get(`gig/${id}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const userId = data?.userId

  const { data: dataUser, isLoading: isLoadingUser, error : errorUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      
        const res = await newRequest.get(`user/${userId}`);
      
      return res.data;
    },
    enabled:!!userId,
  });


  return (
    
      
        <div className="gig">

        


          <div className="container">
        {
          isLoading ? (
            "loading..."
            ) : error ? (
            "SOmething went wrong"
          ) : 
            (
            <div className="left">
              <span className="breadcrumbs">
                fiverr &gt; {data.category} &gt;
              </span>
              <h1>{data.title}</h1>
              {isLoadingUser ? "Loading..." :errorUser ?"Something went wrong" : <div className="user">
                <img
                  className="pp"
                  src= {dataUser.img || "./images/noavatar.png"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                <div className="stars">
                  {Array(Math.round(data.starRating))
                    .fill()
                    .map((_, i) => {
                      return <img src="/images/star.png" alt="" key={i} />;
                    })}
                  <span>{Math.round(data.starRating)}</span>
                </div>
              </div>}
              <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                {data.images.length > 0 ? (
                  data.images.map((img) => {
                    return <img src={img} alt="" key={img} />;
                  })
                ) : (
                  <img
                    src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                )}
              </Slider>
              <h2>About This Gig</h2>
              <p>{data.desc}</p>
              <div className="seller">
                <h2>About The Seller</h2>
                {isLoadingUser ? "Loading..." : errorUser ? "Something went wrong" : <div className="user">
                  <img
                    src= {dataUser.img || "./images/noavatar.png"}
                    alt=""
                  />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    <div className="stars">
                    {Array(Math.round(data.starRating))
                    .fill()
                    .map((_, i) => {
                      return <img src="/images/star.png" alt="" />;
                    })}
                  <span>{Math.round(data.starRating)}</span>
                    </div>
                    <button>Contact Me</button>
                  </div>
                </div>}
                {isLoadingUser ? "Loading..." : errorUser ? "Something went wrong" :
                  <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">{new Date(dataUser.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>
                    {
                      dataUser.desc
                    }
                  </p>
              </div>}
              <Reviews gigId={id} />
            </div>
            </div>)

        }



            {
              isLoading ? (
                "loading..."
                ) : error ? (
                "SOmething went wrong"
              ) : 
              
              
              (<div className="right">
              <div className="price">
                <h3>{data.shortTitle}</h3>
                <h2>₹ {data.price}</h2>
              </div>
              <p>{data.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/images/clock.png" alt="" />
                  <span>{data.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/images/recycle.png" alt="" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                <div className="item">
                  <img src="/images/greencheck.png" alt="" />
                  <span>Prompt writing</span>
                </div>
                <div className="item">
                  <img src="/images/greencheck.png" alt="" />
                  <span>Artwork delivery</span>
                </div>
                <div className="item">
                  <img src="/images/greencheck.png" alt="" />
                  <span>Image upscaling</span>
                </div>
                <div className="item">
                  <img src="/images/greencheck.png" alt="" />
                  <span>Additional design</span>
                </div>
              </div>
              <Link to={`/pay/${id}`} className='link'>
              <button className="paymentBtn">Continue</button>
              </Link>
            </div>)}



          </div>
        </div>
      
      
  )
};

export default Gig;
