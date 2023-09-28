import axios from 'axios'
const BASE_URL = 'http://192.168.1.64:8000'

const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
})
export default instance;