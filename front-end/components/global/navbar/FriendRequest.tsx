import { Session } from "next-auth";
import Image from "next/image";
import convertBlobUrl from "@/lib/convertBlobUrl";
import axiosBearer from "@/lib/axiosBearer";
import { useState } from "react";

type FriendRequestProps = {
  requestId: string;
  sender: {
    accountId: string;
    username: string;
    avatar: string;
  };
  message: string;
  sendTime: string;
  session: Session | null;
};

export default function FriendRequest({ requestId, sender, message, sendTime, session }: FriendRequestProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failureMessage, setFailureMessage] = useState<string | null>(null);

  const rejectFriendRequest = async (requestId: string, session: Session) => {
    await axiosBearer
      .put(
        "/api/friend/reject",
        { requestId: requestId },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      )
      .catch((error) => setFailureMessage(error.message));
  };
  const acceptFriendRequest = async (requestId: string, session: Session) => {
    await axiosBearer
      .put(
        "/api/friend/accept",
        { requestId: requestId },
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      )
      .catch((error) => setFailureMessage(error.message));
  };

  const handleAcceptClick = async () => {
    if (session) {
      try {
        await acceptFriendRequest(requestId, session);
        setSuccessMessage(`You accepted friend request with ${sender.username}`);
      } catch (error) {
        setFailureMessage("Error occured");
      }
    }
  };
  const handleRejectClick = async () => {
    try {
      if (session) {
        await rejectFriendRequest(requestId, session);
        setSuccessMessage(`You rejected friend request with ${sender.username}`);
      }
    } catch (error) {
      setFailureMessage("Error occured");
    }
  };

  return (
    <div className="flex justify-around rounded-lg py-2 hover:bg-slate-100">
      <div className="flex w-1/5 justify-center">
        <Image
          src={convertBlobUrl(sender.avatar)}
          width={40}
          height={40}
          alt="Avatar"
          className="rounded-full w-[50px] h-[50px]"
        ></Image>
      </div>
      <div className="flex flex-col">
        <p className="text-sm">
          <span className="font-bold">{sender.username}</span> sent you a friend request
        </p>
        <p className="text-sm">
          <span className="font-bold">Message:</span> {message}
        </p>
        <p className="text-sm text-blue-600">At {sendTime}</p>
        {successMessage ? (
          failureMessage ? (
            <div className="mt-2">
              <p className="text-red-600">{failureMessage}</p>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-green-400">{successMessage}</p>
            </div>
          )
        ) : (
          <div className="space-x-2 mt-2">
            <button onClick={handleAcceptClick} className="font-semibold rounded-md bg-blue-600 text-white px-4 py-1">
              Accept
            </button>
            <button onClick={handleRejectClick} className="font-semibold rounded-md bg-slate-200 px-4 py-1">
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
