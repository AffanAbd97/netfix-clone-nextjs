
'use client'
import React, { useState, useCallback } from "react";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/app/components/Input";

type Props = {}

const AuthForm = (props: Props) => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("login");
  
    const toggleVariant = useCallback(() => {
      setVariant((currentVariant) =>
        currentVariant === "login" ? "register" : "login"
      );
    }, []);
  
    const login = useCallback(async () => {
      try {
        await signIn('credentials', {
          email,
          password,
          redirect: false,
          callbackUrl: '/'
        });
  
        router.push('/profiles');
      } catch (error) {
        console.log(error);
      }
    }, [email, password, router]);
    const register = useCallback(async () => {
      try {
        await axios.post("/api/register", {
          email,
          name,
          password,
        });
        login();
      } catch (error) {
        console.log(error);
      }
    }, [email, name, password, login]);

  return (
    <div className="flex justify-center">
    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
      <h2 className="text-white text-4xl mb-8 font-semibold">
        {variant == "login" ? "Sign In" : "Create an Account"}
      </h2>

      <div className="flex flex-col gap-4">
        {variant == "register" && (
          <Input
            id="name"
            label="Username"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
            type="text"
            value={name}
          />
        )}
        <Input
          id="email"
          label="Email"
          onChange={(e: any) => {
            setEmail(e.target.value);
          }}
          type="email"
          value={email}
        />
        <Input
          id="password"
          label="Password"
          onChange={(e: any) => {
            setPassword(e.target.value);
          }}
          type="password"
          value={password}
        />
      </div>
      <button
        onClick={variant == "login" ? login : register}
        type="button"
        className="bg-red-600 py-3
      text-white rounded-md w-full mt-10 hover:bg-red-700
      transition"
      >
     
        {variant == "login" ? "Login" : "Sign Up"}
      </button>

      <div
        className="flex flex-row items-center
      gap-4 mt-8 justify-center"
      >
        <div
        onClick={()=>signIn('google',{callbackUrl:'/'})}
          className="w-10 
           h-10 
           bg-white 
           rounded-full
           flex
           items-center
           cursor-pointer
           justify-center
           hover:opacity-80
           transition"
        >
          <FcGoogle size={30} />
        </div>
        <div
        onClick={()=>signIn('github',{callbackUrl:'/'})}
          className="w-10 
          h-10 
          bg-white 
          rounded-full
          flex
          items-center
          cursor-pointer
          justify-center
          hover:opacity-80
          transition"
        >
          <FaGithub size={30} />
        </div>
      </div>
      <p className="text-neutral-500 mt-12">
        {variant == "login"
          ? "Firt time using Netflix?"
          : "Already have and account?"}

        <span
          onClick={toggleVariant}
          className="text-white ml-1 hover:underline cursor-pointer"
        >
          {variant == "login" ? "Create an Account" : "Login"}
        </span>
      </p>
    </div>
  </div>
  )
}

export default AuthForm