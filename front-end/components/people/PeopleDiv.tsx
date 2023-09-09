import { Session } from "next-auth";
import RequestButton from "./RequestButton";
import Image from "next/image";
import convertBlobUrl from "@/lib/convertBlobUrl";

type PeopleDivProps = {
  accountId: number;
  username: string;
  avatar: string;
  dob: string;
  session: Session | null; 
};

export default function PeopleDiv({ username, avatar, dob, session }: PeopleDivProps) {
  const avatarUrl = convertBlobUrl(avatar);
  return (
    <div className="flex flex-col w-1/4 items-center border-2 rounded-lg space-y-4 py-8 bg-white shadow-xl">
      <Image src={avatarUrl} width={250} height={250} alt="Avatar" />
      <p>{username}</p>
      <p>{dob}</p>
      <a href={`/people/${username}`}>
        <button className="px-8 py-2 rounded-full bg-blue-400 text-white">User Profile</button>
      </a>
      <RequestButton {...{username, session}}></RequestButton>
    </div>
  );
}
