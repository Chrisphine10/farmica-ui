import axios from "axios";
import { constants } from "../configs/constants";

axios.defaults.baseURL = constants.API_URL_V2;

const baseAPI2 = axios.create(
    {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }
);

baseAPI2.interceptors.request.use(
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


export default baseAPI2;

