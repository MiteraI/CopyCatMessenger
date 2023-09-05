"use client";

import axiosBearer from "@/lib/axiosBearer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const updateProfileSchema = z.object({
  username: z.string().min(1, { message: "Need to provide username" }),
  introduction: z.string(),
  dob: z.string(),
});

type ProfileDto = {
  accountId: string;
  username: string;
  introduction: string;
  dob: string;
};

export default function InfoProfile({ profileInfo, token }: { profileInfo: ProfileDto; token: any }): React.ReactNode {
  const { register, handleSubmit, formState } = useForm<ProfileDto>({ resolver: zodResolver(updateProfileSchema) });
  const submitProfileChange = async (profile: ProfileDto): Promise<any> => {
    const response = await axiosBearer
      .put("/api/profile/update", profile, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => console.log(response.status))
      .catch((error) => console.log(error));
  };
  const { errors, isSubmitted, isSubmitting } = formState;

  return (
    <div className="w-2/3 py-8">
      <form onSubmit={handleSubmit(submitProfileChange)} className="flex flex-col space-y-4">
        <div>
          <p>Username</p>
          <input
            type="text"
            {...register("username")}
            defaultValue={profileInfo.username}
            className="w-full rounded-md px-4 py-2 bg-slate-200"
          />
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
        </div>
        <div className="flex justify-end">
          <button className="rounded-md px-8 py-2 bg-yellow-200 mt-4">Update profile</button>
        </div>
      </form>
    </div>
  );
}
