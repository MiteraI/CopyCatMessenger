import Link from "next/link";
import Avatar from "./Avatar";
import FriendRequest from "./FriendRequest";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }): React.ReactNode {
  return (
    <div className="flex justify-between px-12 py-4 border-2 shadow-md">
      <div>
        <Link href={"/"} className="text-lg font-bold text-green-600">
          CopyCat Messenger
        </Link>
      </div>
      <div className="flex space-x-8">
        <FriendRequest session={session}></FriendRequest>
        <Avatar session={session}></Avatar>
      </div>
    </div>
  );
}
