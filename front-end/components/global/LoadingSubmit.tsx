"use client";

import React from "react";
import LoopIcon from "@mui/icons-material/Loop";

type LoadingSubmitProps = {
  children: React.ReactNode;
  isLoading: boolean;
  setIsLoading?: (isLoading: boolean) => void;
};

export default function LoadingSubmit({ children, isLoading, setIsLoading }: LoadingSubmitProps): JSX.Element {
  const handleClick = () => {
    if (isLoading && setIsLoading) {
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <div onClick={handleClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col justify-center items-center w-1/3 h-1/4 bg-white p-4 rounded-lg">
        <LoopIcon
          sx={{
            color: "greenyellow",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(360deg)",
              },
            },
            fontSize: 100,
          }}
        />
        <p className="font-semibold text-lg">{children}</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
