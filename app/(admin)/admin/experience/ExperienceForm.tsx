"use client";

import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import Textarea from "@/components/utils/Textarea";
import {
  ExperienceFormValues,
  experienceSchema,
} from "@/lib/validations/experience.schema";
import {
  Experience,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "@/store/api/experienceApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

interface ExperienceFormProps {
  initialData?: Experience;
  onSuccess: () => void;
}

export default function ExperienceForm({
  initialData,
  onSuccess,
}: ExperienceFormProps) {
  const [createExperience, { isLoading: isCreating }] =
    useCreateExperienceMutation();
  const [updateExperience, { isLoading: isUpdating }] =
    useUpdateExperienceMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: initialData?.company || "",
      role: initialData?.role || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "",
      endDate: initialData?.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "",
      isCurrent: initialData?.isCurrent || false,
      description: initialData?.description || "",
      order: initialData?.order || 1,
    },
  });

  const isCurrent = useWatch({ control, name: "isCurrent" });

  useEffect(() => {
    if (isCurrent) {
      setValue("endDate", "");
    }
  }, [isCurrent, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const payload: Partial<Experience> = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
      };

      if (initialData) {
        await updateExperience({ id: initialData.id, data: payload }).unwrap();
        toast.success("Experience updated successfully!");
      } else {
        await createExperience(payload).unwrap();
        toast.success("Experience added successfully!");
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const isLoading = isCreating || isUpdating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company"
          {...register("company")}
          error={errors.company?.message}
          placeholder="e.g., Google"
        />
        <Input
          label="Role"
          {...register("role")}
          error={errors.role?.message}
          placeholder="e.g., Software Engineer"
        />
        <Input
          type="date"
          label="Start Date"
          {...register("startDate")}
          error={errors.startDate?.message}
        />
        <div>
          <Input
            type="date"
            label="End Date"
            {...register("endDate")}
            error={errors.endDate?.message}
            disabled={isCurrent}
          />
          <div className="mt-2 flex items-center">
            <input
              type="checkbox"
              id="isCurrent"
              {...register("isCurrent")}
              className="mr-2"
            />
            <label htmlFor="isCurrent" className="text-sm font-medium">
              I currently work here
            </label>
          </div>
        </div>
        <Input
          type="number"
          label="Display Order (Optional)"
          {...register("order", { valueAsNumber: true })}
          error={errors.order?.message}
          placeholder="0"
        />
      </div>

      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        placeholder="Describe your responsibilities and achievements..."
        rows={5}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} isLoading={isLoading}>
          {initialData ? "Update Experience" : "Add Experience"}
        </Button>
      </div>
    </form>
  );
}
