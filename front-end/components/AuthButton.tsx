"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthButton() {
  const { data: session} = useSession();
  if (session) {
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">{session.user.username}</p>
        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto">
      Sign In
    </button>
  );
}
