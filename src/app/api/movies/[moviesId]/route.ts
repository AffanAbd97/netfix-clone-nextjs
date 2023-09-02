import { NextResponse } from "next/server";

import db from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
export async function GET(req:Request,
    { params }: { params: { moviesId: string } }) {
        console.log(params.moviesId);
        
    try {
      await serverAuth()
    

    if (typeof params.moviesId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!params.moviesId) {
      throw new Error('Missing Id');
    }

    const movies = await db.movie.findUnique({
      where: {
        id: params.moviesId
      }
    });

    
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
