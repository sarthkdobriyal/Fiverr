import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  

  console.log(currentUser);

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await newRequest.get(`conversation`);
      // console.log(res.data);
      return res.data;
    },
  });

  

  // const {
  //   data: dataUserTo,
  //   isLoading: isLoadingUserTo,
  //   error: errorUserTo,
  // } = useQuery({
  //   queryKey: [conversation.id],
  //   queryFn: async () => {
  //     const res = await newRequest.get(
  //       `user/${req.isSeller ? conversation.buyerId : conversation.sellerId}`
  //     );
  //     const { password, ...info } = res.data;
  //     return info;
  //   },
  // });

  const mutation = useMutation({
    mutationFn: (id) => {
        return newRequest.put(`conversation/${id}`);
    },
    onSuccess:  () => {
        console.log("Success");
        queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }
})

  const handleRead = (id) => {
    mutation.mutate(id)
  }


  return (
    <div className="messages">
      {isLoading ? (
        "Loading.."
      ) : error ? (
        "Error..."
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((conversation) => {
              return (
                <tr className=
                {((currentUser.isSeller && !conversation.readBySeller)
                  || (!currentUser.isSeller && !conversation.readByBuyer))
                   && (
                    "active"
                  )}
                key={conversation.id}>
                  
                    <td>{currentUser.isSeller ? conversation.buyerId : conversation.sellerId}</td>
                  
                  <td>
                    <Link to={`message/${conversation.id}`} className="link">
                      {conversation.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(conversation.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser.isSeller && !conversation.readBySeller) ||
                      (!currentUser.isSeller && !conversation.readByBuyer)) && (
                        <button onClick={() => handleRead(conversation.id)}>Mark as Read</button>
                      )}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
