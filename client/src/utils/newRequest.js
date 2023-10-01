import axios from 'axios'

const newRequest = axios.create({
    baseURL: "https://fiverr-kvdkgp8hw-high-prog.vercel.app/api/",
    withCredentials:true,
})

export default newRequest