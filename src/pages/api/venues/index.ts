import { NextApiRequest, NextApiResponse } from "next";

// import prisma from "../../../../lib/prisma";
// import { IVenue } from "../../../types/venue.types";


// interface ExtendedNextApiRequest extends NextApiRequest {
//   body: {
//     venue: IVenue;
//   };
// }

// export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
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

//   if (req.method === "POST") {
//     try {
//       const {
//         city,
//         description,
//         isVerified,
//         latitude,
//         location,
//         imagesUrl,
//         longitude,
//         name,
//         categoryId,
//         guestCapacity,
//         price,
//         facilities,
//       } = req.body.venue;

//       const { userId } = req.cookies;

//       const user = await prisma.user.findUnique({ where: { id: userId } });

//       if (!user) return res.status(400).send("no log in user found maybe session have expired");

//       const venueType = await prisma.category.findFirst({
//         where: { name: categoryId },
//       });
//       const { id } = venueType;
//       const createdVenue = await prisma.venue.create({
//         data: {
//           city,
//           description,
//           location,
//           name,
//           isVerified,
//           latitude: Number(latitude),
//           longitude: Number(longitude),
//           price: Number(price),
//           guestCapacity: Number(guestCapacity),
//           categoryId: id as string,
//           userId: user?.id,
//           imagesUrl,
//           facilities: {
//             createMany: {
//               data: facilities,
//             },
//           },
//         },
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

//       console.log(createdVenue);

//       return res.status(200).json(createdVenue);
//     } catch (error: any) {
//       console.log(error.message);
//       return res.status(500).send("Server error");
//     }
//   }
// }
