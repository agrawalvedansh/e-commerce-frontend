import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allUsersResponse, deleteUserRequest, messageResponse, userResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";



export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    tagTypes: ['users'],
    endpoints: (builder) => ({

        login: builder.mutation<messageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"]
        }),
        deleteUser: builder.mutation<messageResponse, deleteUserRequest>({
            query: ({userId, adminUserId}) => ({
                url: `${userId}?id=${adminUserId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"]
        }),
        allUsers: builder.query<allUsersResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ['users']
        })
        
    })
});

export const getUser = async(id: string) => {
    try {
        const {data}:{data: userResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)
        return data;
    } catch(error) {
        throw error
    }
}

export const {useLoginMutation, useAllUsersQuery, useDeleteUserMutation} = userAPI;