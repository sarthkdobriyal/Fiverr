import axios from 'axios'

export const upload  = async (file) => {
    try{


    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset',"fiver_");
    // console.log(data);
        const res = await axios.post("https://api.cloudinary.com/v1_1/dzzq87rxb/upload", data);
        const { url } = res.data;
        // console.log(url);
        return url
    }catch(err){
        console.log("upload error");
    }
  }