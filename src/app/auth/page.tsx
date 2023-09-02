
import React, { useState, useCallback } from "react";

import AuthForm from "./components/auth-form";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Auth() {

  const session = await getServerSession(authOptions);
  if (session) {
   redirect('/')
  }
  




  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5 ">
          <img src="/images/logo.png" alt="Netflix Logo" className="h-12" />
        </nav>
       <AuthForm/>
      </div>
    </div>
  );
}
