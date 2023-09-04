"use client";

import useAvatarQuery from "@/hooks/useAvatarQuery";
import Image from "next/image";

export default function AvatarProfile() {
  const { data: avatar } = useAvatarQuery("");

  return (
    <div className="flex flex-col w-1/3 justify-evenly items-center space-y-10">
      <Image src={avatar} width={250} height={250} alt="Avatar" className="rounded-md"></Image>
      <button className="bg-green-400 text-white rounded-md px-10 py-2">Get Image</button>
      <button className="bg-yellow-400 text-white rounded-md px-10 py-2">Save Image</button>
    </div>
  );
}
