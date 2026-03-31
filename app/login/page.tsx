"use client";

import Button from "@/components/utils/Button";
import Card from "@/components/utils/Card";
import Input from "@/components/utils/Input";
import Typography from "@/components/utils/Typography";
import { LoginFormValues, loginSchema } from "@/lib/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const res = await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white border border-border-custom shadow-lg p-8">
          <div className="text-center mb-8">
            <Typography variant="h2" className="text-text-head">
              Admin Login
            </Typography>
            <Typography variant="body1" className="text-text-light mt-2">
              Sign in to manage your portfolio
            </Typography>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              {...register("username")}
              error={errors.username?.message}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              isLoading={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
