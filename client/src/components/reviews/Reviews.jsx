import React from 'react'
import './Reviews.scss'
import Review from '../review/Review'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";


const Reviews = ({gigId}) => {

    const queryClient = useQueryClient();
    
    const {data, isLoading, error , refetch} = useQuery({
        queryKey: ["review"],
        queryFn: async () => {
          const res = await newRequest.get(`review/${gigId}`);
          return res.data;
        },
    });

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post(`/review`, review);
        },
        onSuccess:  () => {
            console.log("Success");
            queryClient.invalidateQueries({ queryKey: ['review'] });
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const desc = e.target[0].value;
        e.target[0].value = "";
        const starNumber = e.target[1].value;
        e.target[1].value = "";
        const review = {
            gigId,
            desc,
            starNumber
        }
        mutation.mutate(review);
    }

    
    
    return (
    <div className="reviews">
                <h2>Reviews</h2>

                {
                    isLoading ? "Loading.." :
                    error ? "Error..." :
                    data.map((review) => (
                        <Review
                            key={review._id}
                            review={review}
                        />
                    ))

                }

                <div className="add">
                    <h3>Add a review</h3>
                    <form action="" onSubmit={handleSubmit}>

                    <input type="text"  placeholder='Write your review'/>
                    <select name="" id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                    </form>
                </div>
                
                
              </div>
    
  )
}

export default Reviews