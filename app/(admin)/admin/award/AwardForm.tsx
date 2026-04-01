"use client";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import ImageViewer from "@/components/utils/ImageViewer";
import Input from "@/components/utils/Input";
import Textarea from "@/components/utils/Textarea";
import { AwardInput, awardSchema } from "@/lib/validations/award.schema";
import { Award } from "@/src/generated/prisma/client";
import {
  useCreateAwardMutation,
  useUpdateAwardMutation,
} from "@/store/api/awardApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

interface AwardFormProps {
  initialData?: Award;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AwardForm({
  initialData,
  onSuccess,
  onCancel,
}: AwardFormProps) {
  const isEditing = !!initialData;

  const [createAward, { isLoading: isCreating }] = useCreateAwardMutation();
  const [updateAward, { isLoading: isUpdating }] = useUpdateAwardMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AwardInput>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      time_to_receipt: initialData?.time_to_receipt || "",
      image: initialData?.image || "",
    },
  });

  const image = useWatch({ control, name: "image" });

  const onSubmit = async (data: AwardInput) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("time_to_receipt", data.time_to_receipt);

      if (data.image) {
        formData.append("image", data.image as any);
      }

      if (isEditing && initialData) {
        await updateAward({
          id: Number(initialData.id),
          data: formData,
        }).unwrap();
        toast.success("Award item updated successfully!");
      } else {
        await createAward(formData).unwrap();
        toast.success("Award item created successfully!");
      }
      onSuccess?.();
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Something went wrong, please try again later",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="e.g. Best Developer Award"
      />

      <Input
        label="Time to Receipt"
        {...register("time_to_receipt")}
        error={errors.time_to_receipt?.message}
        placeholder="e.g. 2026"
      />

      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        rows={4}
        placeholder="Details about the award..."
      />

      <Controller
        name="image"
        control={control}
        render={({ field: { onChange } }) => (
          <FileInput
            label="Image"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            error={errors.image?.message as string}
            accept="image/*"
          />
        )}
      />

      <ImageViewer url={image} height={300} width={300} />

      <div className="flex gap-4 justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isCreating || isUpdating}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isCreating || isUpdating}>
          {isEditing ? "Update Award Item" : "Create Award Item"}
        </Button>
      </div>
    </form>
  );
}
