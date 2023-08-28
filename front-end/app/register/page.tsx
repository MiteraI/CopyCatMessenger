"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import axios from "@/lib/axios";
import { z } from "zod";
import Link from "next/link";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
});

type RegisterFormValues = {
  username: string;
  password: string;
  confirmPassword: string;
  dob: string;
};

export default function RegisterPage() {
  const { register, watch, handleSubmit, formState } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const { errors, isSubmitted, isSubmitting } = formState;

  const submitRegister = async (formValues: RegisterFormValues) => {
    const response = await axios
      .post("/api/auth/register", 
        formValues,
      )
      .then(async () => {        
        await signIn("credentials", {
          username: formValues?.username,
          password: formValues?.password,
          redirect: true,
          callbackUrl: "/",
        });
      }).catch(() => {
        console.log(response);
      });
  };

  return (
    <main className="flex flex-col h-full justify-center items-center m-20">
      <p className="font-bold text-lg my-6">Register Form</p>
      <form onSubmit={handleSubmit(submitRegister)} className="flex flex-col w-1/3 space-y-6">
        {isSubmitting && <p className="text-blue-500">Loading</p>}
        <div className="flex flex-col items-end">
          <div className="flex w-full justify-between items-center">
            <p>Username:</p>
            <input {...register("username")} className="border-2 border-black rounded-md px-4 py-2" />
          </div>
          <p className="text-red-500">{errors.username?.message}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex w-full justify-between items-center">
            <p>Password:</p>
            <input type="password" {...register("password")} className="border-2 border-black rounded-md px-4 py-2" />
          </div>
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex w-full justify-between items-center">
            <p>Confirm password:</p>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "Your password do not match";
                  }
                },
              })}
              className="border-2 border-black rounded-md px-4 py-2"
            />
          </div>
          {isSubmitted && errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword?.message}</p>}
        </div>
        <div className="flex flex-col items-end">
          <div className="flex w-full justify-between items-center">
            <p>Date of birth:</p>
            <input type="date" {...register("dob")} className="border-2 border-black rounded-md px-4 py-2" />
          </div>
          <p className="text-red-500">{errors.dob?.message}</p>
        </div>
        <button type="submit" className="border-2 px-4 py-2 font-bold bg-blue-400">
          Register
        </button>
      </form>
      <Link href={"/login"} className="text-blue-400">
        Login
      </Link>
      <Link href={"/"} className="text-blue-400">
        Home
      </Link>
    </main>
  );
}
