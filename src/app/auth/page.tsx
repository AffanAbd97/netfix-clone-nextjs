"use client";
import React, { useState,useCallback } from "react";
import Input from "../components/Input";
import axios from "axios";

export default function Auth() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const [variant, setVariant] = useState('login')
const toggleVariant = useCallback(
  () => {
    setVariant((currentVariant)=>currentVariant==='login'?'register':'login')
  },
  [],
)


const register = useCallback(
  async () => {
    try {
      
      await axios.post('/api/register',{
        email,name,password
      })
    } catch (error) {
      console.log(error);
      
    }
  },
  [email,name,password],
)




  return (
    <div className="relative h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5 ">
          <img src="/images/logo.png" alt="Netflix Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant=='login'?'Sign In':'Create an Account'}
            </h2>

            <div className="flex flex-col gap-4">
                {variant=='register'&&(

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
            onClick={
              register
            }
            type="button" className="bg-red-600 py-3
            text-white rounded-md w-full mt-10 hover:bg-red-700
            transition"> {variant=='login'?'Login':'Sign Up'}</button>
            <p className="text-neutral-500 mt-12">
            {variant=='login'?'Firt time using Netflix?':'Already have and account?'}
              
                <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
            {variant=='login'?'Create an Account':'Login'}
                    
                </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
