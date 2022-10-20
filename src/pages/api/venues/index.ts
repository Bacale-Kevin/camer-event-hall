import { Facility } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { VenueType } from "./../../../types/venue.types";
import prisma from "../../../../lib/prisma";
import { verifyToken } from "../../../../utils/verifyToken";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    venue: VenueType;
  };
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  //   if (req.method === "GET") {
  //     try {
  //       const venues = await prisma.venue.findMany({
  //         orderBy: { createdAt: "desc" },
  //         include: {
  //           category: {
  //             select: {
  //               name: true,
  //             },
  //           },
  //           user: {
  //             select: {
  //               name: true,
  //               email: true,
  //               role: true,
  //               emailVerified: true,
  //               phone: true,
  //             },
  //           },
  //           amenities: {
  //             select: {
  //               name: true,
  //             },
  //           },
  //         },
  //       });

  //       return res.status(200).json(venues);
  //     } catch (error: any) {
  //       console.log(error.message);
  //       return res.status(500).send("Server error");
  //     }
  //   }

  if (req.method === "POST") {
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

      const collectNameFromFacilities = facilities?.map((fclty) => {
        return {
          name: fclty?.name,
        };
      });

      const { token } = req.cookies;
      const payload = await verifyToken(token!, res);

      const user = await prisma.user.findFirst({ where: { id: payload?.userId } });

      const createdVenue = await prisma.venue.create({
        data: {
          name: venueName,
          price: Number(price),
          description,
          location,
          city,
          guestCapacity: Number(guestCapacity),
          longitude: Number(longitude),
          latitude: Number(latitude),
          isVerified,
          imagesUrl,
          categoryId,
          userId: user?.id!,
          facilities: {
            connect: collectNameFromFacilities,
          },
        },
        include: {
          category: {
            select: {
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
              name: true,
            },
          },
        },
      });

      console.log(createdVenue);

      return res.status(200).json(createdVenue);
    } catch (error: any) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
}
