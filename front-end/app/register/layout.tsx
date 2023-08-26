import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
  description: "Register page for CopyCat Messenger",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
