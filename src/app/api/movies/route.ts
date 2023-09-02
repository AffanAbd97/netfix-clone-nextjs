import { NextResponse } from "next/server";

import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
export async function GET(req:Request) {

    try {
      await serverAuth()
      const movies = await db.movie.findMany();

    
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
