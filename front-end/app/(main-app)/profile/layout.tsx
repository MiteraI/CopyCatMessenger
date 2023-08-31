import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page for CopyCat Messenger",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex justify-between mx-32 my-16">{children}</main>;
}
