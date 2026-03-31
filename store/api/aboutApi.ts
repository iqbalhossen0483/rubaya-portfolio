import { baseApi } from "./baseApi";

const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<any, void>({
      query: () => "/about",
      providesTags: ["About"],
    }),
    updateAbout: builder.mutation<any, any>({
      query: (body) => ({
        url: "/about",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const { useGetAboutQuery, useUpdateAboutMutation } = aboutApi;
