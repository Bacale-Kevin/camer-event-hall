import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail";
import jwt from "jsonwebtoken";
import cookie from "cookie";

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

export default async function loginUser(req: ExtendedNextApiRequest, res: NextApiResponse<Response | string>) {
  try {
    if (req.method === "POST") {
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

      const payload = { userId: user.id };
      const token = await jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });

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

      //   const userData = {
      //     id: user.id,
      //     name: user.name,
      //     email: user.email,
      //     profilePicUrl: user.profilePicUrl,
      //     role: user.role,
      //     emailVerified: user.emailVerified
      //   }

      return res.status(200).json(token);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
}
