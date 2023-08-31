"use client"

import axiosBearer from "@/lib/axiosBearer"

const fetchProfileInfo = async (session: any) => {

}

export default function InfoProfile(): React.ReactNode {
    
    return (
        <div className="w-1/2 border-2 border-black">
            <p>Username</p>
            <textarea value={"Something"} readOnly={true}></textarea>
        </div>
    )
};
