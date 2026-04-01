import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: [
    "Hero",
    "Experience",
    "Events",
    "Gallery",
    "About",
    "Contact",
    "Impact",
    "Award",
  ],
  endpoints: (builder) => ({
    // Hero Endpoints
    getHero: builder.query<{ success: boolean; data: any }, void>({
      query: () => "/hero",
      providesTags: ["Hero"],
    }),
    updateHero: builder.mutation<{ success: boolean; data: any }, any>({
      query: (data) => ({
        url: "/hero",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const { useGetHeroQuery, useUpdateHeroMutation } = baseApi;
