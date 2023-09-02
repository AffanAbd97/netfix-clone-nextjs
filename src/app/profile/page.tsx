import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import UserRow from "./components/user-row";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col ">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is Watching?</h1>
      <UserRow/>
      </div>
    </div>
  );
};

export default ProfilePage;
