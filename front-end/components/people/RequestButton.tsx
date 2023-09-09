"use client";

import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import axiosBearer from "@/lib/axiosBearer";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SuccessIndicator from "../global/SuccessIndicator";

type RequestBtnProps = {
  username: string;
  session: Session | null;
};

type FriendRequest = {
  username: string;
  message: string;
};

export default function RequestButton({ username, session }: RequestBtnProps) {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [callStatus, setCallStatus] = useState<boolean | null>(null);
  const [callMessage, setCallMessage] = useState<string>("");
  const { register, handleSubmit, formState } = useForm<FriendRequest>();
  const makeFriendRequest = async (request: FriendRequest) => {
    await axiosBearer
      .post("api/friend/create-request", request, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
      .then(() => {
        setCallStatus(true);
        setCallMessage("Successfully created friend request");
      })
      .catch((error) => {
        setCallStatus(false);
        setCallMessage(error.response.data);        
      });
    handleCloseForm();
  };

  const handleOpenForm = () => {
    setVisible(true);
  };
  const handleCloseForm = () => {
    setVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpenForm} className="px-8 py-2 rounded-full bg-yellow-400 text-white">
        Friend Request
      </button>
      <SuccessIndicator status={callStatus} message={callMessage} setCallStatus={setCallStatus}></SuccessIndicator>
      {isVisible ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex flex-col w-1/3 h-1/3 space-y-4 bg-white rounded-lg p-4">
            <div className="flex justify-between items-center">
              <p className="font-semibold">Give 'em a reason to be friend</p>
              <div
                onClick={handleCloseForm}
                className="flex justify-center items-center w-[35px] h-[35px] rounded-full hover:bg-slate-200 hover:cursor-pointer"
              >
                <CloseIcon></CloseIcon>
              </div>
            </div>
            <form onSubmit={handleSubmit(makeFriendRequest)} className="flex flex-col space-y-4">
              <input type="hidden" {...register("username")} value={username} />
              <textarea {...register("message")} defaultValue={"Let's be friend!"} className="border-2 p-4"></textarea>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-blue-400 text-white px-8 py-2">
                  Make friend
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
