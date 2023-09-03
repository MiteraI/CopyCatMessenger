"use client";

import useAvatarQuery from "@/hooks/useAvatarQuery";
import Image from "next/image";
import { useState } from "react";

export default function Avatar({ session }: { session: any }): React.ReactNode {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { data: avatar } = useAvatarQuery(session);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => (prev = !prev));
  };

  return (
    <div>
      <div onClick={toggleDropdown}>
        {avatar ? (
          <Image src={avatar} alt="Avatar" width={35} height={35} className="rounded-full"></Image>
        ) : (
          <div className="w-[35px] h-[35px] bg-slate-200 rounded-full"></div>
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 flex flex-col border-2 rounded-lg shadow-md bg-white p-4 mr-4 mt-2">
          <a href="/profile">{session?.user?.username}</a>
          <a href="/friend-request">Friend Request</a>
          <a href="/logout">Logout</a>
        </div>
      )}
    </div>
  );
}
