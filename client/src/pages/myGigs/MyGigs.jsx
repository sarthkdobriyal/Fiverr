import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import newRequest from "../../utils/newRequest.js";

const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mygigs"],
    queryFn: async () => {
      const res = await newRequest.get(`gig/gigs`);
      // console.log(res.data);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`gig/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mygigs"] });
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className="mygigs">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link to="/add" className="link">
              Add New
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>

          {
            data.map((gig) => (
              <tr key={gig._id}>
              <td>
                <img
                  className="image"
                  src={gig.coverImg}
                  alt=""
                />
              </td>
              <td>
              <Link to={`/gig/${gig._id}`} className="link">
              {gig.title}
              </Link>

              </td>
              <td>
               {gig.price}
              </td>
              <td>{gig.sales}</td>
              <td>
                <img className="delete" src="/images/delete.png" alt=""  onClick={() => handleDelete(gig._id)}/>
              </td>
            </tr>
            ))
          }
            </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
