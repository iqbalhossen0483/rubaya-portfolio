import { Award } from "@/src/generated/prisma/client";
import { baseApi } from "./baseApi";

export const awardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAwards: builder.query<Award[], void>({
      query: () => "/award",
      providesTags: ["Award"],
    }),
    createAward: builder.mutation<Award, FormData>({
      query: (body) => ({
        url: "/award",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Award"],
    }),
    updateAward: builder.mutation<Award, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/award/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Award"],
    }),
    deleteAward: builder.mutation<void, number>({
      query: (id) => ({
        url: `/award/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Award"],
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useCreateAwardMutation,
  useUpdateAwardMutation,
  useDeleteAwardMutation,
} = awardApi;
