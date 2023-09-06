import AvatarProfile from "@/components/profile/AvatarProfile";
import InfoProfile from "@/components/profile/InfoProfile";
import { getServerSession, Session } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axiosBearer from "@/lib/axiosBearer";

type ProfileDto = {
  accountId: string;
  username: string;
  introduction: string;
  dob: string;
};

async function getInfoProfile(session: Session | null): Promise<ProfileDto> {
  const response = axiosBearer.get("/api/profile/info", {
    headers: {
      Authorization: `Bearer ${session?.user?.token}`,
    },
  });
  return (await response).data;
}

export default async function MyProfilePage() {
  const session: Session | null = await getServerSession(options);
  const profileInfo = await getInfoProfile(session);
  
  return (
    <>
      <AvatarProfile session={session}></AvatarProfile>
      <InfoProfile profileInfo={profileInfo} session={session}></InfoProfile>
    </>
  );
}
