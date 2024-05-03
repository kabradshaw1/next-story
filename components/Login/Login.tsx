"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Logo from "@/components/Logo/Logo";
import ClientWrapper from "@/utils/ClientWrapper";

export default function Login() {
  const validationSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("This email is not a valid format"),
    password: z
      .string()
      .min(6, "This password is too short")
      .max(50, "This password is too long"),
  });

  type LoginProps = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<LoginProps>({
    resolver: zodResolver(validationSchema),
  });

  return (
    <ClientWrapper>
      <main className="flex flex-wrap justify-center items-center h-screen bg-dark-gray">
        <div className="w-full max-w-lg">
          <form
            noValidate
            className="card"
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <div className="mb-4">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className={`input ${errors.email ? "border-red-600" : "border-gray-700"} bg-gray-700`}
                onBlur={() => trigger("email")}
              />
              <p className="error-message">{errors.email?.message}</p>
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                {...register("password")}
                className={`input ${errors.password ? "border-red-600" : "border-gray-700"} bg-gray-700`}
                onBlur={() => trigger("password")}
              />
              <p className="error-message">{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="btn">
                Submit Form
              </button>
              <p className="text-sm text-custom-blue">place holder message</p>
            </div>
          </form>
        </div>
        <div className="w-full max-w-xs">
          <div className="card">
            <Logo />
          </div>
        </div>
      </main>
    </ClientWrapper>
  );
}
