import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage(),
    }
})