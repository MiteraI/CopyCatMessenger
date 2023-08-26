import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login page for CopyCat Messenger",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
