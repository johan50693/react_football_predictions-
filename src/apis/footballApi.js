import axios from "axios"
import { getEnvVariables } from "../helpers"


const { VITE_API_URL_BACKEND } = getEnvVariables(); 

const footballApi = axios.create({
  baseURL: VITE_API_URL_BACKEND
})

// Definición de interceptores
footballApi.interceptors.request.use( config => {
  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }
  return config;
})

export default footballApi;