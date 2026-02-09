import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`, 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
console.log("Axios instance created with base URL:", axiosInstance.defaults.baseURL);
export default axiosInstance;