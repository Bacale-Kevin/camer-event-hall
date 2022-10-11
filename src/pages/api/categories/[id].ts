import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
  query: {
    id: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const eventTypes = await prisma.category.findUnique({ where: { id } });

      if (!eventTypes) return res.status(404).send("Not found");

      return res.status(200).json(eventTypes);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "PUT") {
    try {
      const { name } = req.body;

      if (!name || name === undefined || !id || id === undefined)
        return res.status(400).send("Empty fields are not allowed");

      const data = await prisma.category.update({
        where: { id },
        data: { name },
      });

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedEventCat = await prisma.category.delete({
        where: { id },
        select: { id: true, name: true, createdAt: true },
      });

      return res.status(201).send(deletedEventCat);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}
