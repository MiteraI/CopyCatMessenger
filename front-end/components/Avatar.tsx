"use client";

import { useSession } from "next-auth/react";
import useAvatarQuery from "@/hooks/useAvatarQuery";

export default function Avatar(): React.ReactNode {
  const { data: session } = useSession();
  const { data: avatar } = useAvatarQuery(session);

  return (
    <div>
      {avatar ? <img src={avatar} className="rounded-full w-[35px]" alt="Avatar" /> : <img src="" alt="avatar" />}
    </div>
  );
}
