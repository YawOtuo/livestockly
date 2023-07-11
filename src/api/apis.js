import axios from "axios";
import { url } from "../weburl";

export const deleteRecord = (record_id) => {
    return axios.delete(`${url}records/${record_id}`); 
}