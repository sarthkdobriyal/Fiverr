import React from "react";
import { Link } from "react-router-dom";
import "./Message.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import moment from "moment";
import { useParams } from "react-router-dom";

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await newRequest.get(`message/${id}`);
      // console.log(res.data);
      return res.data;
    },
  });


  const mutation = useMutation({
    mutationFn: (message) => {
        return newRequest.post(`message`, message);
    },
    onSuccess:  () => {
        console.log("Success");
        queryClient.invalidateQueries({ queryKey: ['messages'] })
    }
})

const handleSubmit = (e) => {
  e.preventDefault();
  mutation.mutate({
    conversationId: id,
    desc: e.target[0].value,
  });
  e.target[0].value = "";
}

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          &gt; John Doe &gt;
        </span>
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Error..."
        ) : (


          <div className="messages" >
          {data.map((message) => (
            <div key={message._id} className={message.userId === currentUser._id ? "item owner" : "item"}>
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <p>
                {message.desc}
              </p>
              </div>
          ))}
            </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
