"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import EmailIcon from "@mui/icons-material/Email";
import axiosBearer from "@/lib/axiosBearer";
import FriendRequest from "./FriendRequest";

type ReceivedRequest = {
  requestId: string;
  sender: {
    accountId: string;
    username: string;
    avatar: string;
  };
  receiverId: string;
  status: string;
  message: string;
  sendTime: string;
};

export default function FriendRequestViewButton({ session }: { session: Session | null }) {
  const [friendRequests, setFriendRequests] = useState<ReceivedRequest[] | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    axiosBearer
      .get("/api/friend/received-request", {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
      .then((response) => {
        setFriendRequests(response.data);
      });
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggleDropDown = () => {
    setDropdownOpen((prev) => (prev = !prev));
  };

  const requestBoard = useRef<HTMLDivElement | null>(null);

  return !pathname.match("/friends") ? (
    <div ref={requestBoard}>
      <div
        onClick={toggleDropDown}
        className="flex justify-center items-center w-[35px] h-[35px] rounded-full bg-slate-200"
      >
        <EmailIcon></EmailIcon>
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 flex flex-col w-1/4 border-2 rounded-lg shadow-lg bg-white mr-4 mt-2 py-4">
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
                  return (
                    <div key={request.requestId} className="w-full px-2">
                      <FriendRequest
                        requestId={request.requestId}
                        sender={request.sender}
                        message={request.message}
                        sendTime={request.sendTime}
                        session={session}
                      ></FriendRequest>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            <div className="flex justify-center items-center"> Unfetched</div>
          )}
        </div>
      )}
    </div>
  ) : (
    <></>
  );
}
