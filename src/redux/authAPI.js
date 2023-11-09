import axios from "axios";
import { constants } from "../config/constants";

export default axios.create({
    baseURL: constants.API_AUTH_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        //"Authorization": `Bearer ${config.API_KEY}`,
    }
});