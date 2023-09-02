


import { getServerSession } from "next-auth/next";

import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LogoutButton from "../components/logout";
import Navbar from "../components/navbar";
import Billboard from "../components/billboard";
import MovieList from "../components/movieList";





export default  async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
   redirect('/auth')
  }

  




  return (
  <>
  <Navbar/>
  <Billboard/>
  <div className="pb-40">
    <MovieList title="Trending Now"/>
  </div>
 </>
  )
}
