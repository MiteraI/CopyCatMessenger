"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginPage(): React.ReactNode {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { errors } = formState;

  const submitLoginCredentials = async (formValues: LoginFormValues): Promise<any> => {
    await signIn("credentials", {
      username: formValues?.username,
      password: formValues?.password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <main className="flex flex-col h-full justify-center items-center m-20">
      <p className="font-bold text-lg my-6">Login Form</p>
      <form onSubmit={handleSubmit(submitLoginCredentials)} className="flex flex-col w-1/3 space-y-6">
        <div className="flex justify-between items-center">
          <p>Username:</p>
          <input
            {...register("username")}
            placeholder="johndoe"
            className="border-2 border-black rounded-md px-4 py-2"
          />
          <span className="text-red-500">{errors.username?.message}</span>
        </div>
        <div className="flex justify-between items-center">
          <p>Password:</p>
          <input
            {...register("password")}
            placeholder="abc123"
            className="border-2 border-black rounded-md px-4 py-2"
          />
          <span className="text-red-500">{errors.password?.message}</span>
        </div>
        <button type="submit">Login</button>
        <Link href={"/register"} className="text-blue-500">
          Register
        </Link>
      </form>
    </main>
  );
}

