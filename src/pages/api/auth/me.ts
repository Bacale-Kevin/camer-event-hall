// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

import prisma from "../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method?.toUpperCase() === "GET") {
    try {
      // const cookie = getCookie("token", { req, res });
      const userId = req.cookies.userId;

      console.log("I AM HERE !!! --> ", userId);

      const user = await prisma.user.findUnique({ where: { id: userId } });

      console.log(user);

      return res.json(user);
    } catch (error: any) {
      console.log(error);
      return res.status(500).send(error.message);
    }
  }
}
