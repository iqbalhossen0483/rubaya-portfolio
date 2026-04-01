"use client";

import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import Spinner from "@/components/utils/Spinner";
import {
  GeneralSettingsInput,
  generalSettingsSchema,
} from "@/lib/validations/settings.schema";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/store/api/settingsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function GeneralSettingsForm() {
  const { data: settingsRes, isLoading: isFetching } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GeneralSettingsInput>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      site_brand_name: "",
      copyright_text: "",
      contact_section_description: "",
      impact_section_description: "",
      event_section_description: "",
    },
  });

  useEffect(() => {
    if (settingsRes?.data) {
      setValue("site_brand_name", settingsRes.data.site_brand_name || "");
      setValue("copyright_text", settingsRes.data.copyright_text || "");
      setValue(
        "contact_section_description",
        settingsRes.data.section_titles?.contact_section_description || "",
      );
      setValue(
        "impact_section_description",
        settingsRes.data.section_titles?.impact_section_description || "",
      );
      setValue(
        "event_section_description",
        settingsRes.data.section_titles?.event_section_description || "",
      );
    }
  }, [settingsRes, setValue]);

  const onSubmit = async (data: GeneralSettingsInput) => {
    try {
      await updateSettings(data).unwrap();
      toast.success("Settings updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.data.message);
    }
  };

  if (isFetching) {
    return <Spinner text="Loading settings..." />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input
        id="site_brand_name"
        label="Site Brand Name"
        placeholder="e.g. My Portfolio"
        {...register("site_brand_name")}
        error={errors.site_brand_name?.message as string}
      />
      <Input
        id="copyright_text"
        label="Copyright Text"
        placeholder="e.g. © 2024 My Portfolio"
        {...register("copyright_text")}
        error={errors.copyright_text?.message as string}
      />
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isUpdating}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}
