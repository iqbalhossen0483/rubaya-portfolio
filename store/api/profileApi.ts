import { ProfileSettingsInput } from "@/lib/validations/settings.schema";
import { baseApi } from "./baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<
      { success: boolean; data: any },
      ProfileSettingsInput
    >({
      query: (data) => ({
        url: "/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Me"],
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApi;
