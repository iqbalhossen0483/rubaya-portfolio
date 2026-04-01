import { baseApi } from "./baseApi";

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  order: number;
}

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query<Experience[], void>({
      query: () => "/experience",
      providesTags: ["Experience"],
    }),
    getExperienceById: builder.query<Experience, number>({
      query: (id) => `/experience/${id}`,
      providesTags: (result, error, id) => [{ type: "Experience", id }],
    }),
    createExperience: builder.mutation<Experience, Partial<Experience>>({
      query: (body) => ({
        url: "/experience",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Experience"],
    }),
    updateExperience: builder.mutation<
      Experience,
      { id: number; data: Partial<Experience> }
    >({
      query: ({ id, data }) => ({
        url: `/experience/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Experience",
        { type: "Experience", id },
      ],
    }),
    deleteExperience: builder.mutation<void, number>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experience"],
    }),
  }),
});

export const {
  useGetExperiencesQuery,
  useGetExperienceByIdQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
