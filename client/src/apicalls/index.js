import axios from 'axios';

export const axiosInstance = axios.create({
    // we need to import base url
    // baseURL : 'http://localhost/5000/api', // but this will go from proxy so no need to add this 
    headers:{
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
})