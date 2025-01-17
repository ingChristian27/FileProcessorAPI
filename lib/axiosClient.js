import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.EXTERNAL_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXTERNAL_API_KEY}`,
  },
});

export default axiosClient;
