"use client";

import useAvatarQuery from "@/hooks/useAvatarQuery";
import Image from "next/image";
import axiosBearer from "@/lib/axiosBearer";
import { useRef, useState, ChangeEvent } from "react";
import { Session } from "next-auth";
import { useQueryClient } from "react-query";
import LoadingSubmit from "../global/LoadingSubmit";

export default function AvatarProfile({ session }: { session: Session | null }) {
  const { data: avatar } = useAvatarQuery(session);
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleGetImage = () => {
    if (fileInputRef.current) fileInputRef.current?.click();
  };

  const handleSaveImage = async () => {
    if (!selectedImage) {
      alert("Choose an image first");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage);

    await axiosBearer
      .put("api/profile/update-avatar", formData, {
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        queryClient.invalidateQueries("avatar");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-1/3 justify-evenly items-center space-y-8">
      <LoadingSubmit isLoading={isLoading}>Updating your avatar...</LoadingSubmit>
      <input
        type="file"
        ref={fileInputRef}
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      {selectedImage ? (
        <Image src={URL.createObjectURL(selectedImage)} width={250} height={250} alt="Avatar" className="rounded-md" />
      ) : (
        <Image src={avatar} width={250} height={250} alt="Avatar" className="rounded-md" />
      )}
      <button onClick={handleGetImage} className="bg-green-400 text-white rounded-md px-10 py-2">
        Get Image
      </button>
      <button onClick={handleSaveImage} className="bg-yellow-400 text-white rounded-md px-10 py-2">
        Save Image
      </button>
    </div>
  );
}
