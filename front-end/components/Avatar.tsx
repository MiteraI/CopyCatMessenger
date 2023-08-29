"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import axiosBearer from "@/lib/axiosBearer";

export default function Avatar(): React.ReactNode {
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    if (session?.user?.token) {
      axiosBearer
        .get("api/profile/avatar", {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
          responseType: "arraybuffer"
        })
        .then((response) => {            
          const blob = new Blob([response.data], { type: "image/png" });
          console.log(blob);
          
          const imageUrl = URL.createObjectURL(blob);
          setAvatar(imageUrl);
        })
        .catch((error) => {
          console.log(error + " failed");
        });
    }
  }, [session]);
  return <div>{avatar ? <img src={avatar} alt="Avatar" /> : <img src="" alt="avatar" />}</div>;
}
