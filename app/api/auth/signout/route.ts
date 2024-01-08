import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().has("remember-me") && cookies().delete("remember-me");
  return NextResponse.json({ message: "logged out" });
}
