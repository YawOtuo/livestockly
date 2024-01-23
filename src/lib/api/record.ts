import { url } from "../../../weburl";

export const GetOneRecord = async (id) => {
  const response = await fetch(`${url}records/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return response.json();
};

export const AddRecord = async (data) => {
  const response = await fetch(`${url}records`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Using fetch
export const searchSpecificRecords = async (type, searchInput) => {
  try {
    const response = await fetch(`${url}records/${type}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchInput }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search error:", error.message);
    throw error;
  }
};

// Using fetch
export const searchRecords = async (searchInput : string) => {
  try {
    const response = await fetch(`${url}records/any/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchInput }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search error:", error.message);
    throw error;
  }
};

export const updateRecord = async (id, data) => {

  const response = await fetch(`${url}records/${id}`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateRecordJSON = async (id, data, label) => {
  console.log(id, data, label);
  const response = await fetch(`${url}records/${id}/${label}`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateRecordJSONOne = async (id, data, label, index) => {
  const response = await fetch(`${url}records/${id}/${label}/index/${index}`, {
    method: "POST", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteRecordJSONOne = async (id, label, index) => {
  const response = await fetch(`${url}records/${id}/${label}/index/${index}`, {
    method: "DELETE", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const deleteImage = async (id, index) => {
  const response = await fetch(`${url}records/image/${id}/index/${index}`, {
    method: "DELETE", // or 'PATCH' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
