import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value;

  const authURL = new URL("/login", request.url);
  const privateURL = new URL("/", request.url);

  const requestURL = request.nextUrl.pathname;

  if(!token){
    if(requestURL === "/login" || requestURL === "/registro") {
      return NextResponse.next()
    }

    return NextResponse.redirect(authURL);
  }

  if(requestURL === "/login" || requestURL === "/registro") {
    return NextResponse.redirect(privateURL);
  }
}

export const config = {
  matcher: [
    "/login",
    "/registro", 
    "/nova-causa", 
    "/perfil",
    "/dashboard"
  ]
}