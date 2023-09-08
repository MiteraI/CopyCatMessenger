"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axiosBearer from "@/lib/axiosBearer";
import SearchIcon from "@mui/icons-material/Search";
import LoadingSubmit from "@/components/global/LoadingSubmit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PeopleDiv from "@/components/people/PeopleDiv";

const searchSchema = z.object({
  username: z.string().min(1, { message: "Cannot leave search name empty" }),
});

type People = {
  accountId: number;
  username: string;
  avatar: string;
  introduction: string;
  dob: string;
};

type UsernameSearch = {
  username: string;
};

export default function PeopleListPage() {
  const { data: session } = useSession();
  const [people, setPeople] = useState<People[] | null>(null);
  const { register, handleSubmit, formState } = useForm<UsernameSearch>({
    resolver: zodResolver(searchSchema),
  });
  const { errors, isSubmitting } = formState;

  const searchFriends = async (username: UsernameSearch): Promise<any> => {
    await axiosBearer
      .post("api/profile/search", username, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
      .then((response) => {
        setPeople(response.data);
      });
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center px-12 py-4 border-2 shadow-md">
        <LoadingSubmit isLoading={isSubmitting}>Looking...</LoadingSubmit>
        <p className="font-semibold text-blue-400">Connect with more people:</p>
        <p>{errors.username?.message}</p>
        <form onSubmit={handleSubmit(searchFriends)} className="flex justify-around w-1/3">
          <div className="flex space-x-4 rounded-full px-6 py-2 bg-slate-200">
            <SearchIcon />
            <input
              type="text"
              {...register("username")}
              className="w-full bg-slate-200 px-2"
              placeholder="Enter name..."
            />
          </div>
          <button type="submit" className="rounded-full px-10 py-2 text-white bg-blue-400">
            Search
          </button>
        </form>
      </div>
      <section className="my-6 mx-36">
        {people ? (
          <>
            {people.map((person) => {
              return <PeopleDiv {...person}></PeopleDiv>;
            })}
          </>
        ) : (
          <>Haven't fetched</>
        )}
      </section>
    </div>
  );
}
