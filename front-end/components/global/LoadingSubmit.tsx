"use client";

import React from "react";

type LoadingSubmitProps = {
  children: React.ReactNode;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export default function LoadingSubmit({ children, isLoading, setIsLoading }: LoadingSubmitProps): JSX.Element {
  const handleClick = () => {
    if (isLoading) {
      setIsLoading(false);
    }
  };
  return isLoading ? (
    <div onClick={handleClick} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex justify-center items-center w-1/3 h-1/4 bg-white p-4 rounded-lg">
        <p>{children}</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
