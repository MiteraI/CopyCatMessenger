"use client";

import { useSession } from "next-auth/react";
import axiosBearer from "@/lib/axiosBearer";

export default function PostApi(): React.ReactNode {
  const { data: session } = useSession();

  const getTest = async (): Promise<any> => {
    const config = {
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
      },
    };
    try {
      const respone = await axiosBearer.get("/api/friend", config);
      console.log(respone.data);
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
