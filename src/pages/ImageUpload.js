import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ImageUpload = () => {
  const [image, setImage] = useState("");
  const [imageUrl,setImageUrl]=useState("");
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    await axios.post("https://dripbackend.onrender.com/uploadImage", formData, {
        params: { userId: localStorage.getItem("userName") },
      });
  };
  useEffect(()=>{
  axios
      .get("https://dripbackend.onrender.com/getImageData", {
        params: { userId: localStorage.getItem("userName") },
      })
      .then((response) => {
        console.log(response.data);
        setImageUrl(response.data);
      });
  },[])
  return (
    <div>
      <h1>img</h1>
      {imageUrl && <img src={`https://dripbackend.onrender.com/${imageUrl}`} style={{height:'100px', width:"100px"}}/>}
     {<input
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        type="file"
      />}
      {<button onClick={handleSubmit}>Upload</button>}
    </div>
  );
};

export default ImageUpload;
