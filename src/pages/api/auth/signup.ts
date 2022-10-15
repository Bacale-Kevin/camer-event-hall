import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import NextCors from "nextjs-cors";
import isEmail from "validator/lib/isEmail";

import prisma from "../../../../lib/prisma";

interface ExtentendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export default async function signupUser(req: ExtentendedNextApiRequest, res: NextApiResponse<string>) {
  if (req.method?.toUpperCase() === "POST") {
    try {
      const { name, email, password } = req.body;

      if (name === "" || email === "" || password === "") {
        return res.status(400).send("Empty fields are not allowed");
      }

      if (!isEmail(email)) {
        return res.status(401).send("Invalid Email");
      }

      if (password.length < 6) {
        return res.status(401).send("Password must be atleast 6 characters");
      }

      const user = await prisma.user.findUnique({ where: { email } });

      if (user) return res.status(400).send("This user already exist login instead");

      const encryptedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({ data: { name, email, hashedPassword: encryptedPassword } });

      return res.status(201).send("Your Account created successfully");
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).send(`${error.message}`);
    }
  }
}
