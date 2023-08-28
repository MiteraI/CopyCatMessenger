import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
