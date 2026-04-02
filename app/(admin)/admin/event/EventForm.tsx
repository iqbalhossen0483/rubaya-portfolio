"use client";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import ImageViewer from "@/components/utils/ImageViewer";
import Input from "@/components/utils/Input";
import Textarea from "@/components/utils/Textarea";
import { EventInput, eventSchema } from "@/lib/validations/event.schema";
import { Event } from "@/src/generated/prisma/client";
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from "@/store/api/eventApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";

interface EventFormProps {
  initialData?: Event;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EventForm({
  initialData,
  onSuccess,
  onCancel,
}: EventFormProps) {
  const isEditing = !!initialData;

  const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      role: initialData?.role || "",
      date: initialData?.date
        ? new Date(initialData.date).toISOString().split("T")[0]
        : "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      coverImage: initialData?.coverImage || "",
    },
  });

  const coverImage = useWatch({ control, name: "coverImage" });

  const onSubmit = async (data: EventInput) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("role", data.role);
      formData.append("date", data.date as string);
      formData.append("location", data.location);
      formData.append("description", data.description);

      if (data.coverImage) {
        formData.append("coverImage", data.coverImage as any);
      }

      if (isEditing && initialData) {
        await updateEvent({
          id: Number(initialData.id),
          data: formData,
        }).unwrap();
        toast.success("Event updated successfully!");
      } else {
        await createEvent(formData).unwrap();
        toast.success("Event created successfully!");
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
        label="Event Title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="e.g. AI Summit 2026"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Role"
          {...register("role")}
          error={errors.role?.message}
          placeholder="e.g. Keynote Speaker"
        />

        <Input
          type="date"
          label="Date"
          {...register("date")}
          error={errors.date?.message}
        />
      </div>

      <Input
        label="Location"
        {...register("location")}
        error={errors.location?.message}
        placeholder="e.g. San Francisco, CA"
      />

      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        rows={15}
        placeholder="Details about the event..."
      />

      <Controller
        name="coverImage"
        control={control}
        render={({ field: { onChange } }) => (
          <FileInput
            label="Cover Image"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
            error={errors.coverImage?.message as string}
            accept="image/*"
          />
        )}
      />

      <ImageViewer url={coverImage} height={300} width={300} />

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
          {isEditing ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
