import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page for CopyCat Messenger",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
