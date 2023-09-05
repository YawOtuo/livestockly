import axios from "axios";
import { url } from "../weburl";

export const deleteRecord = (record_id) => {
    return axios.delete(`${url}records/${record_id}`);
}

export const signUp = (data) => {
    return axios.post(`${url}users/signup`, data );

}

export const login = (data) => {
    var form_data = new FormData();

    for (var key in data) {
        form_data.append(key, data[key]);
    }
    return axios.post(`${url}users`, form_data);

}

export const getCurrentUser = (headers) => {
    console.log(headers)
    return axios.get(`${url}users/`, {headers});

}

export const uploadImage = (body, id) =>{
    console.log(body)
    return axios.post(`${url}records/${id}`, body );
}