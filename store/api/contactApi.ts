import { Contact } from "@/src/generated/prisma/client";
import { baseApi } from "./baseApi";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<{ success: boolean; data: Contact }, void>({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
    updateContact: builder.mutation<
      { success: boolean; data: Contact },
      FormData
    >({
      query: (data) => ({
        url: "/contact",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactQuery, useUpdateContactMutation } = contactApi;
