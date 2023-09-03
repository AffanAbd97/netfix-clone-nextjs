import { NextResponse } from "next/server";

import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
export async function GET(req:Request) {

    try {
        const { currentUser } = await serverAuth();
    const favoritedMovies = await db.movie.findMany({
        where: {
          id: {
            in: currentUser?.favoriteIds,
          }
        }
      });
    return NextResponse.json(favoritedMovies, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
