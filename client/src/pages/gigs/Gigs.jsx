import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import GigCard from "../../components/gigCard/GigCard";
import "./Gigs.scss";
import {
  useQuery,
} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";

const Gigs = () => {
  // const queryClient = useQueryClient();
  
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const maxref = useRef();
  const minref = useRef();

  const { search } = useLocation()
  console.log(search); 
  const query = useQuery({
    queryKey: ["gigs"],
    queryFn: async () => {
      const res = await newRequest.get(`gig/gigs${search}&min=${minref.current.value}&max=${maxref.current.value}&sort=${sort}`);
      // console.log(res.data);
      return res.data;
    },
  });
  
  const {data, isLoading, error, refetch} = query;

  // console.log(data)
  
  


  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort])

  const apply = () => {
    console.log(minref.current.value)
    console.log(maxref.current.value)
    refetch();
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">FIVERR &gt; GRAPHICS & DESIGN &gt;</span>
        <h1>AI ARTISTS</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget: </span>
            <input type="number" placeholder="Min Price" ref={minref}   min="0"  />
            <input type="number" placeholder="Max Price" ref={maxref}   min="0" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort BY</span>
            <span className="sortType">
              {sort == "sales" ? "Best Selling" : "Newest"}
            </span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5XIroJU2if29UsqweeEEeLIHXMbs_BOspMJee_cmCAQ&s"
              alt=""
              onClick={() => setOpen((state) => !state)}
            />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "Loading...."
            : error
            ? "Something went wrong" + `${error.message}`
            : (data) && data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
