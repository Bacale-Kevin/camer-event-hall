import { NextApiRequest, NextApiResponse } from "next";

import cookie from "cookie";

export default function logOutUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      res.setHeader("Set-Cookie", [
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        }),

        cookie.serialize("userId", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        }),

        cookie.serialize("role", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        }),
      ]);

      return res.status(200).send("logout successfull");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
}
