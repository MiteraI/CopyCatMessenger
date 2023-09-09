"use client";

import { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type SuccessIndicatorProps = {
  status: boolean | null;
  message?: string;
  setCallStatus?: (callStatus: boolean | null) => void;
};

export default function SuccessIndicator({ status, message, setCallStatus }: SuccessIndicatorProps) {
  const indicatorWindow = document.getElementById("indicator-window");

  useEffect(() => {
    if (status === true || status === false) {
      indicatorWindow?.classList.remove("-translate-y-40");
      indicatorWindow?.classList.add("translate-y-10");
      setTimeout(() => {
        indicatorWindow?.classList.add("-translate-y-40");
        indicatorWindow?.classList.remove("translate-y-10");
        if (setCallStatus) setCallStatus(null);
      }, 2500);
    }
    console.log("Status: " + status);
  }, [status]);

  return (
    <div
      className="flex flex-col fixed inset-0 w-1/5 h-1/5 border-2 rounded-lg bg-white shadow-xl -translate-x-1/2 left-1/2 transition-transform ease-in-out -translate-y-40 p-4"
      id="indicator-window"
    >
      <div className="flex justify-start items-center space-x-4">
        {status !== null && (
          <>
            {status ? (
              <>
                <CheckCircleIcon sx={{ color: "greenyellow" }}></CheckCircleIcon>
                <p>Success</p>
              </>
            ) : (
              <>
                <CancelIcon sx={{ color: "red" }}></CancelIcon>
                <p>Failure</p>
              </>
            )}
          </>
        )}
      </div>
      <p className="font-semibold my-2">{message}</p>
    </div>
  );
}
