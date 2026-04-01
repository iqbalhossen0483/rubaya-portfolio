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
  section: "contact" | "impact" | "event";
}

export default function SectionDescriptionForm({
  section,
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
        `${section}_section_description`,
        settingsRes.data.section_titles[`${section}_section_description`] || "",
      );
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
        id={`${section}_section_description`}
        label={`${
          section.charAt(0).toUpperCase() + section.slice(1)
        } Section Description`}
        placeholder={`Enter description for ${section} section`}
        {...register(`${section}_section_description`)}
        error={errors[`${section}_section_description`]?.message as string}
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
