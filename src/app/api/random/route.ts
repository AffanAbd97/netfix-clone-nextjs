import { NextResponse } from "next/server";

import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
export async function GET(req:Request) {

    try {
      await serverAuth()
    const moviesCount = await db.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await db.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
