import Image from "next/image";
import convertBlobUrl from "@/lib/convertBlobUrl";

type Request = {
  avatar: string;
  username: string;
  message: string;
  sendTime: string;
};

export default function FriendRequest({ avatar, username, message, sendTime }: Request) {
  return (
    <div className="flex justify-around rounded-lg py-2 hover:bg-slate-100">
      <div className="flex w-1/5 justify-center">
        <Image
          src={convertBlobUrl(avatar)}
          width={40}
          height={40}
          alt="Avatar"
          className="rounded-full w-[50px] h-[50px]"
        ></Image>
      </div>
      <div className="flex flex-col">
        <p className="text-sm">
          <span className="font-bold">{username}</span> sent you a friend request
        </p>
        <p className="text-sm">
          <span className="font-bold">Message:</span> {message}
        </p>
        <p className="text-sm text-blue-600">At {sendTime}</p>
        <div className="space-x-2 mt-2">
          <button className="font-semibold rounded-md bg-blue-600 text-white px-4 py-1">Accept</button>
          <button className="font-semibold rounded-md bg-slate-200 px-4 py-1">Delete</button>
        </div>
      </div>
    </div>
  );
}
