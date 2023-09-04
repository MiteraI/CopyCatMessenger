import "../../public/css/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CopyCat Messenger",
  description: "Main page for CopyCat Messenger",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar session={session}></Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}
