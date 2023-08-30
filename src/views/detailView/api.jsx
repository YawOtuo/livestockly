import { url } from "../../weburl";

export const fetchRecord = async (id) => {
    const response = await fetch(`${url}records/${id}`);
    return response.json();
  };

  export const updateRecord = async (id, data) => {
    console.log('updating data',id,  data)

    const response = await fetch(`${url}records/${id}`, {
        method: 'POST', // or 'PATCH' depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
  }; 