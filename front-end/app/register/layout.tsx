import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/components/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Register Page",
  description: "Register page for CopyCat Messenger",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
