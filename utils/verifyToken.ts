import * as jose from "jose";

interface JwtPayload extends jose.JWTVerifyResult {
  payload: {
    userId?: string;
    role?: string;
  };
}

export const verifyToken = async (token: string) => {
  const { payload }: JwtPayload = (await jose.jwtVerify(
    `${token}`,
    new TextEncoder().encode(`${process.env.JWT_SECRET}`)
  )) as JwtPayload;

  return payload;
};
