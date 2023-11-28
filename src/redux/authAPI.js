import axios from "axios";
import { constants } from "../configs/constants";

export default axios.create({
    baseURL: constants.API_AUTH_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        //"Authorization": `Bearer ${config.API_KEY}`,
    }
});