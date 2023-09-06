"use client";

import axiosBearer from "@/lib/axiosBearer";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoadingSubmit from "../global/LoadingSubmit";

const updateProfileSchema = z.object({
  username: z.string().min(1, { message: "Need to provide username" }),
  introduction: z.string(),
  dob: z.string().min(1, {message: "Must include date of birth"}),
});

type ProfileDto = {
  accountId: string;
  username: string;
  introduction: string;
  dob: string;
};

type InfoProfileProps = {
  profileInfo: ProfileDto;
  session: Session | null;
};

export default function InfoProfile({ profileInfo, session }: InfoProfileProps): React.ReactNode {
  const { register, handleSubmit, formState } = useForm<ProfileDto>({ resolver: zodResolver(updateProfileSchema) });
  const submitProfileChange = async (profile: ProfileDto): Promise<any> => {
    await axiosBearer
      .put("/api/profile/update", profile, { headers: { Authorization: `Bearer ${session?.user?.token}` } })
      .catch((error) => console.log(error));
  };
  const { errors, isSubmitting } = formState;

  return (
    <div className="w-2/3 py-8">
      <LoadingSubmit isLoading={isSubmitting}>Updating your profile...</LoadingSubmit>
      <form onSubmit={handleSubmit(submitProfileChange)} className="flex flex-col space-y-4">
        <div>
          <p>Username</p>
          <input
            type="text"
            {...register("username")}
            defaultValue={profileInfo.username}
            className="w-full rounded-md px-4 py-2 bg-slate-200"
          />
          <p className="text-red-400">{errors.username?.message}</p>
        </div>
        <div>
          <p>Introduction</p>
          <textarea
            {...register("introduction")}
            defaultValue={profileInfo.introduction ? profileInfo.introduction : ""}
            className="w-full border-2 bg-slate-200 rounded-md px-4 py-2"
          ></textarea>
        </div>
        <div>
          <p>Date of birth</p>
          <input
            type="date"
            {...register("dob")}
            defaultValue={profileInfo.dob}
            className="w-full bg-slate-200 rounded-md px-4 py-2"
          />
          <p className="text-red-400">{errors.dob?.message}</p>
        </div>
        <div className="flex justify-end">
          <button className="rounded-md px-8 py-2 bg-yellow-200 mt-4">Update profile</button>
        </div>
      </form>
    </div>
  );
}
