import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({
  // baseURL: `http://localhost:9000`,
  timeout: 5000
});

export default axiosClient;
