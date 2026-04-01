"use client";

import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import {
  ProfileSettingsInput,
  profileSettingsSchema,
} from "@/lib/validations/settings.schema";
import { useGetMeQuery } from "@/store/api/authApi";
import { useUpdateProfileMutation } from "@/store/api/profileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfileSettingsForm() {
  const { data: me } = useGetMeQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileSettingsInput>({
    resolver: zodResolver(profileSettingsSchema),
  });

  useEffect(() => {
    if (me?.data?.name) {
      setValue("name", me.data.name);
    }
  }, [me, setValue]);

  const onSubmit = async (data: ProfileSettingsInput) => {
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <Input
        id="name"
        label="Name"
        placeholder="e.g. John Doe"
        {...register("name")}
        error={errors.name?.message as string}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Enter new password"
        {...register("password")}
        error={errors.password?.message as string}
      />
      <Input
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm new password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message as string}
      />
      <div className="pt-4 flex justify-end">
        <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}
