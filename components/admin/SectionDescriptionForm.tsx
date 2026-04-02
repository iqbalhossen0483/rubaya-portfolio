"use client";

import Button from "@/components/utils/Button";
import Textarea from "@/components/utils/Textarea";
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

interface SectionDescriptionFormProps {
  section:
    | "contact_section_description"
    | "impact_section_description"
    | "event_section_description";
  title: string;
}

export default function SectionDescriptionForm({
  section,
  title,
}: SectionDescriptionFormProps) {
  const { data: settingsRes } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GeneralSettingsInput>({
    resolver: zodResolver(generalSettingsSchema),
  });

  useEffect(() => {
    if (settingsRes?.data) {
      setValue(
        `section_description.${section}`,
        settingsRes.data.section_description?.[section] || "",
      );
      setValue("site_brand_name", settingsRes.data.site_brand_name || "");
      setValue("copyright_text", settingsRes.data.copyright_text || "");
    }
  }, [settingsRes, setValue, section]);

  const onSubmit = async (data: GeneralSettingsInput) => {
    try {
      await updateSettings(data).unwrap();
      toast.success("Section description updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mb-6">
      <Textarea
        id={`${section}`}
        label={title}
        rows={4}
        placeholder={`Enter description for ${section} section`}
        {...register(`section_description.${section}`)}
        error={errors.section_description?.[section]?.message as string}
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
