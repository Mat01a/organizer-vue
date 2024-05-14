import axios from 'axios'
const BASE_URL = 'http://localhost:8000'

const instance = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: BASE_URL
})
export default instance;