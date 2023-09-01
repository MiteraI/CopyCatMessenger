"use client";

import useAvatarQuery from "@/hooks/useAvatarQuery";
import { useSession } from "next-auth/react";

export default function AvatarProfile() {
  const { data: session } = useSession();
  const { data: avatar } = useAvatarQuery(session);

  return (
    <div className="flex flex-col w-1/2 justify-evenly items-center">
      <img src={avatar} alt="Avatar" className="rounded-md" />
    </div>
  );
}
