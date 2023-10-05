import { url } from "../../weburl";

export const fetchCompanyUsers = async (id) => {

    const response = await fetch(`${url}company/${id}/users`);
    return response.json();

}

export const fetchCompanyUsersOne = async (company_id,user_id) => {

    const response = await fetch(`${url}company/${company_id}/users/${user_id}`);
    return response.json();

}