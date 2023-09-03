import serverAuth from "@/lib/serverAuth";
import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  try {
    const { currentUser } = await serverAuth();

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{status:500});
  }
}
