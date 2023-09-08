"use client"

type RequestBtnProps = {
    username: string;
}

export default function RequestButton({username}: RequestBtnProps) {

    return <button className="px-8 py-2 rounded-full bg-yellow-400 text-white">Friend Request</button>
};
