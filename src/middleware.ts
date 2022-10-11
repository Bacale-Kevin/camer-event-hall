import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyToken } from "../utils/verifyToken";

const PUBLIC_FILE = /\.(.*)$/;
const ROUTE_LIST_PROTECTED = ["/"];
const ROUTE_LIST = ["/auth/login", "/auth/signup"];
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = await request.cookies.get("token");
  const url = request.nextUrl.clone();

  /*** EXCLUDE ALL GENERATED PUBLIC FILES ***/
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) return NextResponse.next();

  /*** PREVENT NON AUTH USERS FROM ACCESSING THE HOME PAGE ***/
  if (ROUTE_LIST_PROTECTED.includes(url.pathname)) {
    if (!token) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  /*** PREVENT AUTH USERS FROM ACCESSING THE LOGIN SIGNUP AND FORGOT PASSWORD PAGE ***/
  if (ROUTE_LIST.includes(url.pathname)) {
    if (token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
