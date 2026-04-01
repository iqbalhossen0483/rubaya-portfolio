import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<{ success: boolean; data: any }, void>({
      query: () => "/auth/me",
      providesTags: ["Me"],
    }),
  }),
});

export const { useGetMeQuery } = authApi;
