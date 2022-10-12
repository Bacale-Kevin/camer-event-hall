import { Category } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import * as dayjs from "dayjs";

import prisma from "../../../../lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        select: { id: true, name: true, createdAt: true },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "POST") {
    try {
      const { name } = req.body;

      if (name === undefined || name === "" || name === null) {
        return res.status(400).send(`Empty fields not allowed`);
      }

      const category = await prisma.category.findFirst({ where: { name: name.toLowerCase() } });

      if (category) return res.status(400).send(`Category ${category.name} already exist please create another one`);

      const createdCategory = await prisma.category.create({
        data: {
          name: name.toLowerCase(),
        },
      });

      return res.status(201).json({ createdCategory, message: "Category created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}
