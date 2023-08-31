import AvatarProfile from "@/components/profile/AvatarProfile";
import InfoProfile from "@/components/profile/InfoProfile";
import { getSession } from "next-auth/react";

export default function MyProfilePage() {
    
  return (
    <>
      <AvatarProfile></AvatarProfile>
      <InfoProfile></InfoProfile>
    </>
  );
}


