


import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout";
import Navbar from "../components/navbar";
import Billboard from "../components/billboard";
import MovieList, { Type } from "../components/movieList";
import IndexMovie from "../components/indexMovie";
import useInfoModalStore from "@/hooks/useInfoModal";
import InfoModal from "../components/infoModal";





export default  async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
   redirect('/auth')
  }


  




  return (
  <>
  
    <InfoModal  />
  <Navbar/>
  <Billboard/>
 <IndexMovie/>
 </>
  )
}
