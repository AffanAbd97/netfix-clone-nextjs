"use client"
import React from 'react'
import { getSession,signOut } from "next-auth/react";

export default function LogoutButton() {

  return (
    <button onClick={()=>signOut()} className='text-white font-bold text-4xl'>Logout</button>
  )
}
