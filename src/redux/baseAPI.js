import axios from "axios";
import { constants } from "../config/constants";

axios.defaults.baseURL = constants.API_URL_V1;

const baseAPI = axios.create(
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
);

baseAPI.interceptors.request.use(
    async config => {
        const token = await localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
            //console.log(config.headers.Authorization)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)


export default baseAPI;

