"use client";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import ImageViewer from "@/components/utils/ImageViewer";
import Input from "@/components/utils/Input";
import { GalleryInput, gallerySchema } from "@/lib/validations/gallery.schema";
import { Gallery } from "@/src/generated/prisma/client";
import {
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
} from "@/store/api/galleryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

interface GalleryFormProps {
  initialData?: Gallery;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function GalleryForm({
  initialData,
  onSuccess,
  onCancel,
}: GalleryFormProps) {
  const isEditing = !!initialData;

  const [createGallery, { isLoading: isCreating }] = useCreateGalleryMutation();
  const [updateGallery, { isLoading: isUpdating }] = useUpdateGalleryMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GalleryInput>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      caption: initialData?.caption || "",
      image: initialData?.image || "",
    },
  });

  const image = useWatch({ control, name: "image" });

  const onSubmit = async (data: GalleryInput) => {
    try {
      const formData = new FormData();
      formData.append("caption", data.caption);

      if (data.image) {
        formData.append("image", data.image as any);
      }

      if (isEditing && initialData) {
        await updateGallery({
          id: Number(initialData.id),
          data: formData,
        }).unwrap();
        toast.success("Gallery item updated successfully!");
      } else {
        await createGallery(formData).unwrap();
        toast.success("Gallery item created successfully!");
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
        label="Image Caption"
        {...register("caption")}
        error={errors.caption?.message}
        placeholder="e.g. Speaking at AI Summit"
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
          {isEditing ? "Update Gallery Item" : "Create Gallery Item"}
        </Button>
      </div>
    </form>
  );
}
