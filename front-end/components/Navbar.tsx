import Link from "next/link";
import Avatar from "./Avatar";

export default function Navbar(): React.ReactNode {
  return (
    <div className="flex justify-between px-12 py-4 border-2 shadow-md">
      <div>
        <Link href={"/"} className="text-lg font-bold text-green-600">
          CopyCat Messenger
        </Link>
      </div>
      <Avatar></Avatar>
    </div>
  );
}
