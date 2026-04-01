import { Impact } from "@/src/generated/prisma/client";
import { baseApi } from "./baseApi";

export const impactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getImpacts: builder.query<Impact[], void>({
      query: () => "/impact",
      providesTags: ["Impact"],
    }),
    createImpact: builder.mutation<Impact, FormData>({
      query: (body) => ({
        url: "/impact",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Impact"],
    }),
    updateImpact: builder.mutation<Impact, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/impact/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Impact"],
    }),
    deleteImpact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/impact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Impact"],
    }),
  }),
});

export const {
  useGetImpactsQuery,
  useCreateImpactMutation,
  useUpdateImpactMutation,
  useDeleteImpactMutation,
} = impactApi;
