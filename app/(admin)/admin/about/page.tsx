"use client";

import { useGetAboutQuery, useUpdateAboutMutation } from "@/store/api/aboutApi";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useForm,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { toast } from "react-toastify";

import Button from "@/components/utils/Button";
import FileInput from "@/components/utils/FileInput";
import ImageViewer from "@/components/utils/ImageViewer";
import Input from "@/components/utils/Input";
import Spinner from "@/components/utils/Spinner";
import Textarea from "@/components/utils/Textarea";
import Typography from "@/components/utils/Typography";
import { AboutFormValues, aboutSchema } from "@/lib/validations/about.schema";
import { useEffect } from "react";

export default function AboutAdminPage() {
  const { data, isLoading } = useGetAboutQuery();
  const [updateAbout, { isLoading: isUpdating }] = useUpdateAboutMutation();

  const emptyAcity = {
    label: "",
    icon: "",
  };

  const emptyHighlightedPosition = {
    title: "",
    company: "",
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      activities: [emptyAcity],
      highlightedPositions: [emptyHighlightedPosition],
      description: "",
      philosophy: "",
      title: "",
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (data?.data) {
      setValue("title", data.data.title || "");
      setValue("description", data.data.description || "");
      setValue("philosophy", data.data.philosophy || "");
      setValue("activities", data.data.activities || [emptyAcity]);
      setValue(
        "highlightedPositions",
        data.data.highlightedPositions || [emptyHighlightedPosition],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setValue]);

  const {
    fields: highlightedPositionFields,
    append: appendHighlightedPosition,
    remove: removeHighlightedPosition,
  } = useFieldArray({
    control,
    name: "highlightedPositions",
  });

  const {
    fields: activityFields,
    append: appendActivity,
    remove: removeActivity,
  } = useFieldArray({
    control,
    name: "activities",
  });

  const onSubmit = async (data: AboutFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "activities") {
        (value as any[]).forEach((activity, index) => {
          formData.append(`activities[${index}].label`, activity.label);
          formData.append(`activities[${index}].icon`, activity.icon);
        });
      } else if (key === "highlightedPositions") {
        (value as any[]).forEach((position, index) => {
          formData.append(
            `highlightedPositions[${index}].company`,
            position.company,
          );
          formData.append(
            `highlightedPositions[${index}].title`,
            position.title,
          );
        });
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      await updateAbout(formData).unwrap();
      toast.success("About section updated successfully!");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <Typography variant="h2" className="mb-4">
        Manage About Section
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Title"
          {...register("title")}
          placeholder="e.g., Where Science Meets Practice"
          error={errors.title?.message}
        />
        <Textarea
          label="Description"
          {...register("description")}
          placeholder="e.g., I am a development professional..."
          error={errors.description?.message}
        />
        <Textarea
          label="Philosophy"
          {...register("philosophy")}
          placeholder="e.g., Bridging rigorous environmental science..."
          error={errors.philosophy?.message}
        />

        <div>
          <Typography variant="h3" className="mb-2">
            Highlighted Positions
          </Typography>
          {highlightedPositionFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mb-2">
              <Input
                {...register(`highlightedPositions.${index}.company`)}
                placeholder="e.g., BRAC"
              />
              <Input
                {...register(`highlightedPositions.${index}.title`)}
                placeholder="e.g., Program Officer"
              />
              {highlightedPositionFields.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => removeHighlightedPosition(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            size="sm"
            onClick={() => appendHighlightedPosition(emptyHighlightedPosition)}
          >
            Add Position
          </Button>
        </div>

        <div>
          <Typography variant="h3" className="mb-2">
            Activities
          </Typography>
          {activityFields.map((field, index) => (
            <ActivityField
              key={index}
              control={control}
              field={field}
              index={index}
              register={register}
              removeActivity={removeActivity}
            />
          ))}
          <Button
            type="button"
            size="sm"
            onClick={() => appendActivity(emptyAcity)}
          >
            Add Activity
          </Button>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={isUpdating} isLoading={isUpdating}>
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
}

type ActivityProps = {
  control: Control<AboutFormValues>;
  register: UseFormRegister<AboutFormValues>;
  index: number;
  removeActivity: (index: number) => void;
  field: FieldArrayWithId<AboutFormValues, "activities", "id">;
};

function ActivityField({
  control,
  register,
  index,
  removeActivity,
  field,
}: ActivityProps) {
  const icon = useWatch({ control, name: `activities.${index}.icon` });
  return (
    <div key={field.id} className="flex gap-2 items-center mb-2">
      <Input
        {...register(`activities.${index}.label`)}
        placeholder="e.g., Climate Change Adaptation"
      />
      <Controller
        name={`activities.${index}.icon`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FileInput
            error={error?.message}
            onChange={(e) => field.onChange(e.target.files?.[0])}
          />
        )}
      />
      <ImageViewer url={icon} height={60} width={60} />
      {index > 0 && (
        <Button type="button" size="sm" onClick={() => removeActivity(index)}>
          Remove
        </Button>
      )}
    </div>
  );
}
