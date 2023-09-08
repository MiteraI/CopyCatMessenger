"use client";

import { useState, useEffect, useRef } from "react";
import { Session } from "next-auth";
import EmailIcon from "@mui/icons-material/Email";
import axiosBearer from "@/lib/axiosBearer";

type Request = {
  requestId: string;
  senderId: string;
  receiverId: string;
  status: string;
  message: string;
  sendTime: string;
};

export default function FriendRequest({ session }: { session: Session | null }) {
  const [friendRequests, setFriendRequests] = useState<Request[] | null>(null);

  useEffect(() => {
    axiosBearer
      .get("/api/friend/received-request", {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
      .then((response) => {setFriendRequests(response.data); console.log(friendRequests);
      });
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setDropdownOpen((prev) => (prev = !prev));
  };

  const requestBoard = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={requestBoard}>
      <div
        onClick={toggleDropDown}
        className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-slate-200"
      >
        <EmailIcon></EmailIcon>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 flex flex-col w-1/6 border-2 rounded-lg shadow-lg bg-white mr-4 mt-2 py-4">
          {friendRequests ? (
            <div className="flex justify-center items-center">
              {friendRequests.length == 0 ? (
                <div className="flex flex-col">
                  <p>You seems lonely</p>
                  <a href="/people" className="text-blue-400">
                    Find more friends!
                  </a>
                </div>
              ) : (
                friendRequests.map((request) => {
                  return <>lol</>;
                })
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center"> Unfetched</div>
          )}
        </div>
      )}
    </div>
  );
}
