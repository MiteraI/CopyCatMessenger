import axiosBearer from "@/lib/axiosBearer";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";

type PeopleProps = {
  params: {
    username: string;
  };
};

type People = {
  accountId: number;
  username: string;
  avatar: string;
  introduction: string;
  dob: string;
};

async function fetchPeople(session: Session | null, username: string): Promise<People | undefined> {
  const response = axiosBearer
    .get(`api/profile/${username}`, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    })
    .catch((error) => {
      return error;
    });
  return (await response).data;
}

function convertBlobUrl(base64Avatar: string): string {
  const binaryAvatar = atob(base64Avatar);
  const byteArray = new Uint8Array(binaryAvatar.length);
  for (let i = 0; i < binaryAvatar.length; i++) {
    byteArray[i] = binaryAvatar.charCodeAt(i);
  }
  const avatarBlob = new Blob([byteArray], { type: "image/jpeg" });

  return URL.createObjectURL(avatarBlob);
}

export default async function PeoplePage({ params: { username } }: PeopleProps) {
  const session: Session | null = await getServerSession(options);
  const people: People | undefined = await fetchPeople(session, username);

  if (session?.user?.username == username) {
    redirect("/profile");
  }
  return people ? (
    <div>
      <p>lol {people.accountId}</p>
      <Image src={convertBlobUrl(people.avatar)} width={250} height={250} alt="Avatar"></Image>
    </div>
  ) : (
    <>This mother fucker does not exist</>
  );
}

export async function generateMetadata({ params }: PeopleProps) {
  return {
    title: `Try meeting ${params.username}`,
  };
}
