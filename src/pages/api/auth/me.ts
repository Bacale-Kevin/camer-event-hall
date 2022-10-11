import { verifyToken } from "./../../../../utils/verifyToken";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toUpperCase() === "GET") {
    try {
      const { token } = req.cookies;

      const payload = await verifyToken(token!, res);

      const user = await prisma.user.findUnique({
        where: { id: payload?.userId },
        select: { id: true, name: true, email: true, role: true, emailVerified: true, profilePicUrl: true },
      });

      return res.json(user);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).send(error.message);
    }
  }
}
