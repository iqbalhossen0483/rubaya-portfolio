"use client";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import Input from "@/components/utils/Input";
import Textarea from "@/components/utils/Textarea";
import Typography from "@/components/utils/Typography";
import { HeroFormValues, heroSchema } from "@/lib/validations/content.schema";
import { useGetHeroQuery, useUpdateHeroMutation } from "@/store/api/baseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function HeroAdminPage() {
  const { data: heroRes, isLoading: isFetching } = useGetHeroQuery();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      profile: undefined,
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (heroRes?.data) {
      reset({
        title: heroRes.data.title || "",
        subtitle: heroRes.data.subtitle || "",
        description: heroRes.data.description || "",
        profile: heroRes.data.profile || undefined,
      });
    }
  }, [heroRes, reset]);

  const onSubmit = async (data: HeroFormValues) => {
    try {
      setSuccessMsg(null);

      const formData = new FormData();
      formData.append("title", data.title);
      if (data.subtitle) formData.append("subtitle", data.subtitle);
      if (data.description) formData.append("description", data.description);
      if (data.profile && data.profile.length > 0) {
        formData.append("profile", data.profile[0]);
      }

      await updateHero(formData).unwrap();
      setSuccessMsg("Hero section updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
    }
  };

  if (isFetching) {
    return (
      <div className="text-text-mid animate-pulse">Loading hero content...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4 mb-6">
        <Typography variant="h3" className="text-text-head">
          Manage Hero Section
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Update the main introduction content on your portfolio homepage.
        </Typography>
      </div>

      {successMsg && (
        <div className="p-4 bg-accent-pale text-accent-muted border border-accent-soft rounded-lg">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="title"
          label="Main Title"
          placeholder="E.g., Hi, I am Rubaya"
          {...register("title")}
          error={errors.title?.message}
        />

        <Input
          id="subtitle"
          label="Subtitle"
          placeholder="E.g., Software Engineer & Designer"
          {...register("subtitle")}
          error={errors.subtitle?.message}
        />

        <Textarea
          id="description"
          label="Description"
          placeholder="A brief introduction about yourself..."
          rows={4}
          {...register("description")}
          error={errors.description?.message}
        />

        <FileInput
          id="profile"
          label="Hero Profile Image"
          {...register("profile")}
          error={errors.profile?.message as string}
        />

        <div className="pt-4 flex justify-end">
          <Button type="submit" variant="primary" isLoading={isUpdating}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
