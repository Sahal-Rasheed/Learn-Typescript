// Axios Data Fetching with TypeScript

import axios, { AxiosResponse } from "axios";
// import type { AxiosResponse } from "axios";


interface User {
    id: number;
    name: string;
    email: string;
}

// const fetchUser = async (id: number): Promise<AxiosResponse<User>> => {
//     const response = await axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
//     return response;
// };

// OR

const fetchUser = async (id: number) => {
    try {
        const response: AxiosResponse<User> = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        return response;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // handle axios erros with type and auto-completion support
            console.error(`Axios error fetching user with ID ${id}:`, error.message);
            if (error.response) {
                console.error(`Response status: ${error.response.status}`);
                console.error(`Response data:`, error.response.data);
            }
        } else {
            // handle non-axios errors
            console.error(`Unexpected error fetching user with ID ${id}:`, error);
        }
        throw error;
    }
};

const displayUser = async (id: number) => {
    const user = await fetchUser(id)
    console.log(`User ID: ${user.data.id}`);
    console.log(`User Name: ${user.data.name}`);
    console.log(`User Email: ${user.data.email}`);
}
displayUser(1);  // Fetch and display user with ID 1
