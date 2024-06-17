import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { ISub, ISubsciber, IUserData } from "../types";

const excludeUserId = (formData: FormData) => {
    const newFormData = new FormData();
    formData.forEach((value, key) => {
        if (key !== "userId") {
            newFormData.append(key, value);
        }
    });
    return newFormData;
};

export const userApi = createApi({
    reducerPath: "userInfo",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers) => {
            const token = getTokenFromLocalStorage();
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['User'],
    endpoints: build => ({
        getUser: build.query<IUserData, string>({
            query: (id: string) => ({
                url: `/users/${id}`
            }),
            providesTags: ['User'],
        }),
        getSubscription: build.query<ISub[], string>({
            query: (id: string) => ({
                url: `/users/${id}/subs`
            }),
            providesTags: ['User'],
        }),
        toggleSub: build.mutation<string, string>({
            query: (id: string) => ({
                url: `/users/${id}/toggle-sub`,
                method: "POST"
            }),
            invalidatesTags: ['User'],
        }),
        getSubscibers: build.query<ISubsciber[], string>({
            query: (userId: string) => ({
                url: `/users/${userId}/subs-videos`
            }),
            providesTags: ['User'],
        }),
        editUserData: build.mutation<string, FormData>({
            query: (formData: FormData) => {
                const updatedFormData = excludeUserId(formData);
                return {
                    url: `/users/${formData.get("userId")}`,
                    method: "PUT",
                    body: updatedFormData,
                    responseHandler: "text"
                };
            },
            invalidatesTags: ['User']
        })
    })
})

export const {useGetUserQuery, useGetSubscriptionQuery, useToggleSubMutation, useGetSubscibersQuery, useEditUserDataMutation} = userApi