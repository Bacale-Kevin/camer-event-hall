import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const facilities = await prisma.facility.findMany({
        select: { id: true, name: true, createdAt: true },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(facilities);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "POST") {
    const { name } = req.body;

    try {
      if (name === undefined || name === "" || name === null) {
        return res.status(400).send(`Empty fields not allowed`);
      }

      const facility = await prisma.facility.findFirst({ where: { name: name.toLowerCase() } });

      if (facility) return res.status(400).send(`Facility ${facility.name} already exist please create another one`);

      const createdFacility = await prisma.facility.create({
        data: {
          name: name.toLowerCase(),
        },
      });

      return res.status(201).json({ createdFacility, message: "Facility created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}
