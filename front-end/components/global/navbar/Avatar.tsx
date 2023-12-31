"use client";

import useAvatarQuery from "@/hooks/useAvatarQuery";
import Image from "next/image";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import { useState, useRef, useEffect } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function Avatar({ session }: { session: Session | null }): React.ReactNode {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const { data: avatar } = useAvatarQuery(session);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => (prev = !prev));
  };

  const avatarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={avatarRef}>
      <div onClick={toggleDropdown}>
        {avatar ? (
          <Image src={avatar} alt="Avatar" width={35} height={35} className="rounded-full" />
        ) : (
          <div className="w-[35px] h-[35px] bg-slate-200 rounded-full"></div>
        )}
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 flex flex-col w-1/6 border-2 rounded-lg shadow-lg bg-white mr-4 mt-2 py-4">
          <a href="/profile">
            <div className="flex items-center space-x-4 px-4 py-2 mx-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer">
              {avatar ? (
                <Image src={avatar} alt="Avatar" width={30} height={30} className="rounded-full" />
              ) : (
                <div className="w-[30px] h-[30px] bg-slate-200 rounded-full"></div>
              )}
              <p className="font-medium">{session?.user?.username}</p>
            </div>
          </a>
          <div className="flex items-center space-x-4 px-4 py-2 mx-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer">
            <div className="flex justify-center items-center w-[33px] h-[33px] bg-slate-200 rounded-full">
              <PeopleIcon />
            </div>
            <p className="font-medium">Friends</p>
          </div>
          <div
            onClick={() => signOut()}
            className="flex items-center space-x-4 px-4 py-2 mx-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer"
          >
            <div className="flex justify-center items-center w-[33px] h-[33px] bg-slate-200 rounded-full">
              <LogoutIcon />
            </div>
            <p className="font-medium">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
}
