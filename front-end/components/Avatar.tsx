"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import axiosBearer from "@/lib/axiosBearer";

const fetchAvatar = async (token: any): Promise<any> => {
  return axiosBearer
    .get("api/profile/avatar", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    })
    .then((response) => {
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      
      return imageUrl;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function Avatar(): React.ReactNode {
  const { data: session } = useSession();
  const { data: avatar } = useQuery("avatar", () => fetchAvatar(session?.user?.token), {
    enabled: session?.user?.token ? true : false,
    staleTime: 1000*60
  });
  
  return (
    <div>
      {avatar ? <img src={avatar} className="rounded-full w-[35px]" alt="Avatar" /> : <img src="" alt="avatar" />}
    </div>
  );
}
