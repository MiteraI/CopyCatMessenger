import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "CopyCat Messenger",
  description: "Main page for CopyCat Messenger",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
