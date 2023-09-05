"use client"

import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import LoadingSubmit from "@/components/global/LoadingSubmit";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleClick = () => {setIsLoading(true)};
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24">
        <div>
          <p>Main page</p>
          <AutoFixNormalIcon sx={{ color: "blueviolet" }} />
          <LoadingSubmit isLoading={isLoading} setIsLoading={setIsLoading}>
            It's nice seeing you here
          </LoadingSubmit>
        </div>
        <button onClick={handleClick}>Say hello!</button>
      </main>
    </>
  );
}
