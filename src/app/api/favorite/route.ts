import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import { without } from "lodash";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const movieId = (await req.formData()).get("movieId");
    console.log(movieId as string);
    const existingMovie = await db.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const user = await db.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId as string,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    const data = await req.json()
    data.movieId
    


    const existingMovie = await db.movie.findUnique({
      where: {
        id: data.movieId,
      },
    });

    if (!existingMovie) {
      throw new Error("Invalid ID");
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, data.movieId);

    const updatedUser = await db.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
}
