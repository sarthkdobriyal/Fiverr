import React from 'react'
import './Review.scss'
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";


const Review = ({review}) => {

  const { data: dataUser, isLoading: isLoadingUser, error : errorUser } = useQuery({
    queryKey: [review.userId],
    queryFn: async () => {
      const res = await newRequest.get(`user/${review.userId}`);
      const {password, ...info} = res.data
      return info;
    },
  });



  return (
    <div className="item">
                  { isLoadingUser ? "loading..." : errorUser ? "Error" :
                    <div className="user">
                    <img
                      className="pp dark" 
                      src={dataUser.img || "./images/noavatar.png"}
                      alt=""
                    />
                    <div className="info">
                      <span>{dataUser.username}</span>
                      <div className="country">
                        {/* <img
                          src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                          alt=""
                        /> */}
                        <span>{dataUser.country}</span>
                      </div>
                    </div>
                  </div>}

                  <div className="stars">
                    
                  {Array(Math.round(review.starNumber))
                    .fill()
                    .map((_, i) => {
                      return <img src="/images/star.png" alt=""  key={i} />;
                    })}
                  <span>{Math.round(review.starNumber)}</span>
                  </div>
                  <p>
                    {review.desc}
                  </p>
                  <div className="helpful">
                    <span>Helpful?</span>
                    <img src="/images/like.png" alt="" />
                    <span>Yes</span>
                    <img src="/images/dislike.png" alt="" />
                    <span>No</span>
                  </div>
                </div>



    
  )
}

export default Review