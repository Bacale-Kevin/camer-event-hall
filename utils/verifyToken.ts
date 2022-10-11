import { NextApiResponse } from "next";
import * as jose from "jose";
import cookie from "cookie";

interface JwtPayload extends jose.JWTVerifyResult {
  payload: {
    userId?: string;
    role?: string;
  };
}

export const verifyToken = async (token: string, res: NextApiResponse) => {
  try {
    const { payload }: JwtPayload = (await jose.jwtVerify(
      `${token}`,
      new TextEncoder().encode(`${process.env.JWT_SECRET}`)
    )) as JwtPayload;

    return payload;
  } catch (error: any) {
    console.log(error.message);
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),

      cookie.serialize("userId", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),

      cookie.serialize("role", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.status(401).send("Error verifying your token please login again!");
  }
};
