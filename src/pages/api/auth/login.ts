import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import NextCors from "nextjs-cors";
import * as jose from "jose";
import cookie from "cookie";
import initMiddleware from "../../../../lib/init-middleware";

import prisma from "../../../../lib/prisma";
import { User } from "@prisma/client";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

type Response = {
  token: string;
  user: User;
};

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<Response | string>) {
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      //validations
      if (!isEmail(email)) {
        return res.status(401).send("Invalid Email");
      }
      if (password.length < 6) {
        return res.status(401).send("Password must be atleast 6 characters");
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) return res.status(400).send("Invalid login credentials");

      const isPassword = await bcrypt.compare(password, user.hashedPassword);

      if (!isPassword) return res.status(400).send("Invalid login credentials");

      /***** CREATE TOKEN AND ASSIGN USERID AND ROLE AS PAYLOAD *****/
      const payload = { userId: user.id, role: user.role };
      const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token!, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 300 * 300,
          sameSite: "strict",
          path: "/",
        })
      );

      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
  return res.send("Hello NextJs Cors!");
}
