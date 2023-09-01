import "../../public/css/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CopyCat Messenger",
  description: "Main page for CopyCat Messenger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar></Navbar>
          {children}
        </Providers>
      </body>
    </html>
  );
}