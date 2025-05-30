"use client";
import {useSession} from "next-auth/react";
export const Logged = () => {
    const {data: session} = useSession();
    return (
        <p className="text-sm text-gray-500 mt-2">
        You are logged in as  {session?.user?.name}
      </p>
    );
};