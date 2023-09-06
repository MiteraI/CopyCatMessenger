import Head from "next/head";

type PeopleProps = {
  params: {
    id: string;
  };
};

export default async function People({ params: { id } }: PeopleProps) {
  return (
    <div>
      <Head>
        <title>I'm tired</title>
      </Head>
      <p>lol</p>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: "..c.",
  };
}

