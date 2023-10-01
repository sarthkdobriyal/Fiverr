import axios from 'axios'

const newRequest = axios.create({
    baseURL: "https://fiverclone-xfko.onrender.com/api/",
    withCredentials:true,
})

export default newRequest