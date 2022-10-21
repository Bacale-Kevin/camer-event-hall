import { NextApiRequest, NextApiResponse } from "next";

import { VenueType } from "./../../../types/venue.types";
import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../utils/verifyToken";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    venue: VenueType;
  };
  query: {
    id: string;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const venue = await prisma.venue.findUnique({
        where: { id },
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
          user: {
            select: {
              name: true,
              email: true,
              role: true,
              emailVerified: true,
              phone: true,
            },
          },
          facilities: {
            select: {
              id: true,
              name: true,
              createdAt: true,
            },
          },
        },
      });

      return res.status(200).json(venue);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "PUT") {
    try {
      const {
        city,
        description,
        isVerified,
        latitude,
        location,
        imagesUrl,
        longitude,
        name: venueName,
        categoryId,
        guestCapacity,
        price,
        facilities,
      } = req.body.venue;

      //   const uniqueImagesUrl = imagesUrl?.filter((el, i) => {
      //     return imagesUrl.indexOf(el) === i;
      //   });

        console.log("ImagesUrl --> ", imagesUrl);
      //   console.log("uniqueImagesUrl --> ", uniqueImagesUrl);
      const { token } = req.cookies;
      const payload = await verifyToken(token!, res);
      const user = await prisma.user.findFirst({ where: { id: payload?.userId } });
      
      if (!venueName || !city || !description || !categoryId || !guestCapacity || !price || !id)
        return res.status(400).send("Empty fields are not allowed");

      await prisma.venue.update({ where: { id }, data: { imagesUrl: { set: [] } } });
      const data = await prisma.venue.update({
        where: { id },
        data: {
          name: venueName.toLowerCase(),
          price: Number(price),
          description,
          location,
          city,
          guestCapacity: Number(guestCapacity),
          longitude: Number(longitude),
          latitude: Number(latitude),
          isVerified,
          imagesUrl: imagesUrl,
          categoryId,
          userId: user?.id!,
          facilities: {
            set: [],
            connect: facilities!,
          },
        },
      });

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }

  if (req.method === "DELETE") {
    try {
      const deletedVenue = await prisma.venue.delete({
        where: { id },
        select: { id: true, name: true, createdAt: true },
      });

      return res.status(201).send(deletedVenue);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Server error");
    }
  }
}
