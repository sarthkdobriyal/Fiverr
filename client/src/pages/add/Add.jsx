import React, { useReducer, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { upload } from "../../utils/uploads.js";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer.js";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);


  const handleChange = (e) => {
    dispatch({
       type: "CHANGE_INPUT",
      payload: {name: e.target.name, value: e.target.value}
      });
  };


  const handleFeatures = (e) => {
    e.preventDefault();
    dispatch({
       type: "ADD_FEATURES",
        payload: e.target[0].value
      });
      e.target[0].value = "";
  };

  const handleUpload = async (e) => {
    setUploading(true);
    try{
      const coverImg =  await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async(file) => {
          const url = await upload(file);
          return url;
        })
      )
      setUploading(false);
      dispatch({
        type: "ADD_IMAGES",
        payload: {coverImg, images}
      })

    }catch(err){
      console.log(err)
    }
  };

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (state) => {
      return newRequest.post(`gig/create`, state);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["add"] });
    },
  });

  const handleSubmit = (e) => {
    console.log(state)
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");

  }



  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              name="title"
              type="text"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="category">Category</label>
            <select name="category" id="category" onChange={handleChange}>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Graphic & Design</option>
              <option value="music">Video </option>
              <option value="music">Writing & translation</option>
              <option value="music">AI Services</option>
              <option value="music">Digital Marketing</option>
              <option value="music">Music & Audio</option>
              <option value="music">Programming & tech</option>
              <option value="music">Business</option>
              <option value="music">Lifestyle</option>
            </select>

            <div className="images">
              <div className="imageInputs">
            <label htmlFor="">Cover Image</label>
            <input type="file" onChange={(e) => setSingleFile(e.target.files[0])} />
            <label htmlFor="">Upload Images</label>
            <input type="file" multiple onChange={e=>setFiles(e.target.files)}/>
            </div>
            <button onClick={handleUpload}>{uploading ? "Uploading..." : "Upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              onChange={handleChange}
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              name="shortTitle"
              type="text"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              onChange={handleChange}
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              min={1}
              name="deliveryTime"
              onChange={handleChange}
            />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeatures}>
            <input type="text" placeholder="e.g. page design" name="features" />
            <button type="submit" >Add</button>
            </form>
            <div className="addedfeatures">
              { state.features.map((f) => (
                  <div className="item" key={f}>
                <button onClick={() => dispatch({
                  type: "REMOVE_FEATURES",
                  payload: f
                })}>{f}
                  
                </button>
              </div>
                  )) 
              }
            </div>


            <label htmlFor="">Price</label>
            <input name="price" onChange={handleChange} type="number" min={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
