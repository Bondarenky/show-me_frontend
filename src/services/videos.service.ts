import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";
import { IVideo, IVideoDetails } from "../types";

export const videosApi = createApi({
    reducerPath: "videosApi",
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
    tagTypes: ['Video'],
    endpoints: build => ({
        getVideo: build.query<IVideoDetails, string>({
            query: (id: string) => ({
                url: `/videos/one/${id}`
            }),
            providesTags: ['Video'],
        }),
        getVideosTypes: build.query<{name: string}[], string>({
            query: () => ({
                url: "/types"
            }),
            providesTags: ['Video'],
        }),
        toggleLike: build.mutation({
            query: (videoId: string) => ({
                url: `/videos/${videoId}/toggle-like`,
                method: "POST"
            }),
            invalidatesTags: ['Video'],
        }),
        toggleDislike: build.mutation({
            query: (videoId: string) => ({
                url: `/videos/${videoId}/toggle-dislike`,
                method: "POST"
            }),
            invalidatesTags: ['Video'],
        }),
        getAllVideos: build.mutation<IVideo[], {searchText: string, type: string}>({
            query: ({searchText, type}) => ({
                url: "/videos/list",
                method: "POST",
                body: {searchText, type}
            }),
            invalidatesTags: ['Video'],
        }),
        getLiked: build.query<IVideo[], string>({
            query: () => ({
                url: "/videos/liked"
            }),
            providesTags: ['Video'],
        }),
        getHistory: build.query<IVideo[], string>({
            query: () => ({
                url: "/videos/history"
            }),
            providesTags: ['Video'],
        }),
        addVideo: build.mutation<string, FormData>({
            query: (formData: FormData) => ({
                url: "/videos",
                method: "POST",
                body: formData,
                responseHandler: "text"
            }),
            invalidatesTags: ["Video"]
        })
    })
})

export const {useGetVideoQuery, useToggleLikeMutation, useToggleDislikeMutation, useGetVideosTypesQuery, useGetAllVideosMutation, useGetLikedQuery, useGetHistoryQuery, useAddVideoMutation} = videosApi