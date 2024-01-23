import axios from "axios";
import { supabase } from "../utils/supabase";
import { url } from "../../../weburl";

export const deleteRecord = (record_id) => {
    return axios.delete(`${url}records/${record_id}`);
}

export const signUp = async (farm_name, userData) => {
    try {
        const farmResponse = await axios.get(`${url}farms/verify/${farm_name}`);

        if (farmResponse.status === 200) {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
            });

            if (error) {
                console.error('Supabase signup error:', error.message);
                return { success: false, message: 'Signup failed' };
            }

            // User signup successful, proceed with additional user data
            const userResponse = await axios.post(`${url}users/signup`, {
                ...userData, farm_id : farmResponse?.data?.id
            });

            return data 
        } else {
            console.error('Farm signup failed:', farmResponse.statusText);
            // Handle farm signup error
            return { success: false, message: 'Farm signup failed' };
        }
    } catch (error) {
        console.error('Request error:', error.message);
        // Handle other errors (e.g., network issues)
        return { success: false, message: 'Request failed' };
    }
};

export const login = async (farm_name, form_data) => {
    try {
        // Check farm verification status
        const farmResponse = await axios.get(`${url}farms/verify/${farm_name}`);

        if (farmResponse.status !== 200) {
            console.error('Farm verification failed:', farmResponse.statusText);
            // Handle farm verification failure
            return { success: false, message: 'Farm verification failed' };
        }

        // Farm verification successful, proceed with Supabase login
        const { data, error } = await supabase.auth.signInWithPassword({
            email: form_data.email,
            password: form_data.password,
        });

        if (error) {
            console.error('Supabase login error:', error.message);
            return { success: false, message: 'Login failed' };
        }

        if (data) {
            return data
        }
     
    } catch (error) {
        console.error('Login error:', error.message);
        return { success: false, message: 'Request failed' };
    }
};



export const getCurrentUser = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (data) {

        return data
    }
    else {
        console.log(error)
    }





}


export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
}

export const uploadImage = (body, id) => {
    console.log(body)
    return axios.post(`${url}records/${id}`, body);
}