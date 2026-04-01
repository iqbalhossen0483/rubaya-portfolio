"use client";

import Button from "@/components/utils/Button";
import Input from "@/components/utils/Input";
import Spinner from "@/components/utils/Spinner";
import Typography from "@/components/utils/Typography";
import { ContactInput, contactSchema } from "@/lib/validations/contact.schema";
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from "@/store/api/contactApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactAdminPage() {
  const { data: contactRes, isLoading: isFetching } = useGetContactQuery();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      phone: "",
      location: "",
      linkedin_url: "",
    },
  });

  // Populate form when data loads
  useEffect(() => {
    if (contactRes?.data) {
      setValue("email", contactRes.data.email || "");
      setValue("phone", contactRes.data.phone || "");
      setValue("location", contactRes.data.location || "");
      setValue("linkedin_url", contactRes.data.linkedin_url || "");
    }
  }, [contactRes, setValue]);

  const onSubmit = async (data: ContactInput) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      await updateContact(formData).unwrap();
      toast.success("Contact section updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err);
      toast.error(err.data.message);
    }
  };

  if (isFetching) {
    return <Spinner text="Loading contact content..." />;
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-border-custom pb-4 mb-6">
        <Typography variant="h3" className="text-text-head">
          Manage Contact Section
        </Typography>
        <Typography variant="body2" className="text-text-light mt-1">
          Update the contact information on your portfolio homepage.
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="email"
          label="Email"
          placeholder="e.g. your.email@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          id="phone"
          label="Phone"
          placeholder="e.g. +1 123 456 7890"
          {...register("phone")}
          error={errors.phone?.message}
        />

        <Input
          id="location"
          label="Location"
          placeholder="e.g. San Francisco, CA"
          {...register("location")}
          error={errors.location?.message}
        />

        <Input
          id="linkedin_url"
          label="LinkedIn URL"
          placeholder="e.g. https://www.linkedin.com/in/your-profile"
          {...register("linkedin_url")}
          error={errors.linkedin_url?.message}
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
    </div>
  );
}
