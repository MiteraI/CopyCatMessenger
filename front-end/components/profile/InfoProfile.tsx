"use client";

import axiosBearer from "@/lib/axiosBearer";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type ProfileDto = {
  accountId: string;
  username: string;
  introduction: string;
  dob: Date;
};

const fetchProfileInfo = async (token: any): Promise<ProfileDto> => {
  const response = axiosBearer
    .get("api/profile/info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};

export default function InfoProfile(): React.ReactNode {
  //const [profileInfo, setProfileInfo] = useState<ProfileDto | null>(null);
  const { data: session } = useSession();
  const profileInfo = fetchProfileInfo(session?.user?.token);

  return (
    <div className="w-1/2 border-2 border-black">
      <p>Username</p>
      <textarea value={"Something"} readOnly={true}></textarea>
    </div>
  );
}
