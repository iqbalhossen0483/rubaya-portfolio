import { GeneralSettingsInput } from "@/lib/validations/settings.schema";
import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query<{ success: boolean; data: any }, void>({
      query: () => "/settings",
      providesTags: ["Settings"],
    }),
    updateSettings: builder.mutation<
      { success: boolean; data: any },
      GeneralSettingsInput
    >({
      query: (data) => ({
        url: "/settings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
