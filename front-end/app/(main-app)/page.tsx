import AuthButton from "@/components/AuthButton";
import PostApi from "@/components/PostApi";
import Link from "next/link";
export default function Home(): React.ReactNode {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <p className="lol">Main page</p>
          <span>
            <AuthButton></AuthButton>
          </span>
        </div>
        <PostApi></PostApi>
        <Link href={"/register"} className="text-blue-400">
          register
        </Link>
        <Link href={"/profile"}>Profile page</Link>
      </main>
    </>
  );
}
