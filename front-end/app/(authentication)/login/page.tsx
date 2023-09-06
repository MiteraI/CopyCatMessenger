"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import LoadingSubmit from "@/components/global/LoadingSubmit";
import { useRouter } from "next/navigation";

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
  const { errors, isSubmitting } = formState;
  const [result, setResult] = useState<string | null | undefined>(null);
  const router = useRouter();

  const submitLoginCredentials = async (formValues: LoginFormValues): Promise<any> => {
    await signIn("credentials", {
      username: formValues?.username,
      password: formValues?.password,
      redirect: false,
    }).then((resposne) => {
      setResult(resposne?.error);
      router.push("/");
    });
  };
  return (
    <main className="flex flex-col h-full justify-center items-center m-20">
      <LoadingSubmit isLoading={isSubmitting}>Logging in...</LoadingSubmit>
      <p className="font-bold text-lg">Login Form</p>
      <p className="font-semibold text-red-400">{result}</p>
      <form onSubmit={handleSubmit(submitLoginCredentials)} className="flex flex-col w-1/3 space-y-6 my-10">
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
