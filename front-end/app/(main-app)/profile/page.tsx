import AvatarProfile from "@/components/profile/AvatarProfile";
import InfoProfile from "@/components/profile/InfoProfile";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axiosBearer from "@/lib/axiosBearer";

type ProfileDto = {
  accountId: string;
  username: string;
  introduction: string;
  dob: string;
};

async function getInfoProfile(token: any): Promise<ProfileDto> {
  const response = axiosBearer.get("/api/profile/info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (await response).data;
}

export default async function MyProfilePage() {
  const session = await getServerSession(options);
  const jwtToken = session?.user?.token;
  const profileInfo = await getInfoProfile(jwtToken);
  
  return (
    <>
      <AvatarProfile token={jwtToken}></AvatarProfile>
      <InfoProfile profileInfo={profileInfo} token={jwtToken}></InfoProfile>
    </>
  );
}
