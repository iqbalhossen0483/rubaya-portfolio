import { Gallery } from "@/src/generated/prisma/client";
import { baseApi } from "./baseApi";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query<Gallery[], void>({
      query: () => "/gallery",
      providesTags: ["Gallery"],
    }),
    createGallery: builder.mutation<Gallery, FormData>({
      query: (body) => ({
        url: "/gallery",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Gallery"],
    }),
    updateGallery: builder.mutation<Gallery, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/gallery/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Gallery"],
    }),
    deleteGallery: builder.mutation<void, number>({
      query: (id) => ({
        url: `/gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gallery"],
    }),
  }),
});

export const {
  useGetGalleriesQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApi;
