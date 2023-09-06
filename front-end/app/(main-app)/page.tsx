"use client";

import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import LoadingSubmit from "@/components/global/LoadingSubmit";
import { useState } from "react";
import PostApi from "@/components/PostApi";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClick = () => {
    setIsLoading(true);
  };
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <LoadingSubmit isLoading={isLoading} setIsLoading={setIsLoading}>
          It&aoisls nice seeing you here
        </LoadingSubmit>
        <div>
          <p>Main page</p>
          <AutoFixNormalIcon
            sx={{
              color: "blueviolet",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": {
                  transform: "rotate(360deg)",
                },
              },
              fontSize: 100,
            }}
          />
          <PostApi></PostApi>
        </div>
        <button onClick={handleClick}>Say hello!</button>
      </main>
    </>
  );
}
