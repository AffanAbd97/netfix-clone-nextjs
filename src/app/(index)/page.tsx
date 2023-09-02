


import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout";
import Navbar from "../components/navbar";
import Billboard from "../components/billboard";





export default  async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
   redirect('/auth')
  }

  




  return (
  <>
  <Navbar/>
  <Billboard/>
 </>
  )
}
