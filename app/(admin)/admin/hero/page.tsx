"use client";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import ImageViewer from "@/components/utils/ImageViewer";
import Input from "@/components/utils/Input";
import Spinner from "@/components/utils/Spinner";
import Textarea from "@/components/utils/Textarea";
import Typography from "@/components/utils/Typography";
import { HeroFormValues, heroSchema } from "@/lib/validations/content.schema";
import { useGetHeroQuery, useUpdateHeroMutation } from "@/store/api/baseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

export default function HeroAdminPage() {
  const { data: heroRes, isLoading: isFetching } = useGetHeroQuery();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      yearsOfExperience: "",
      countries: "",
      award: "",
      profile: "",
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (heroRes?.data) {
      setValue("title", heroRes.data.title || "");
      setValue("subtitle", heroRes.data.subtitle || "");
      setValue("description", heroRes.data.description || "");
      setValue("yearsOfExperience", heroRes.data.yearsOfExperience || "");
      setValue("countries", heroRes.data.countries || "");
      setValue("award", heroRes.data.award || "");
      setValue("profile", heroRes.data.profile || "");
    }
  }, [heroRes, setValue]);

  const profileImage = useWatch({ control, name: "profile" });

  const onSubmit = async (data: HeroFormValues) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          if (key === "profile" && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value as string);
          }
        }
      });

      await updateHero(formData).unwrap();
      toast.success("Hero section updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.data.message);
    }
  };

  if (isFetching) {
    return <Spinner text="Loading hero content..." />;
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

        <Input
          id="yearsOfExperience"
          label="Years of Experience"
          placeholder="e.g., 5+ Years"
          {...register("yearsOfExperience")}
          error={errors.yearsOfExperience?.message}
        />

        <Input
          id="countries"
          label="Countries Worked In"
          placeholder="e.g., Canada, UAE, Bangladesh"
          {...register("countries")}
          error={errors.countries?.message}
        />

        <Input
          id="award"
          label="Award"
          placeholder="e.g., Google Dev Award"
          {...register("award")}
          error={errors.award?.message}
        />

        <Controller
          control={control}
          name="profile"
          render={({ field, fieldState: { error } }) => (
            <FileInput
              id="profile"
              label="Hero Profile Image"
              onChange={(e) => field.onChange(e.target.files?.[0])}
              error={error?.message}
            />
          )}
        />

        {/* preview profile image */}
        <ImageViewer url={profileImage} />

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
    </div>
  );
}
