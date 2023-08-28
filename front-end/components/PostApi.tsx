"use client";

import { useSession } from "next-auth/react";
import axiosBearer from "@/lib/axiosBearer";

export default function PostApi() {
  const { data: session } = useSession();

  const getTest = async () => {
    const config = {
      headers: {
        "Authorization": `Bearer ${session?.user.token}`,
      },
    };
    try {
      const respone = await axiosBearer.get("/api/messages/test", config);
      console.log(respone);
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={getTest}>test bro</button>
    </>
  );
}
