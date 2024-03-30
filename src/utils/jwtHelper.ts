import jwt from "jsonwebtoken";
import config from "../config";

export const jwtHelpers = async (payload: { userId: number }) => {
  return await jwt.sign(payload, config.secret as string, {
    expiresIn: config.expiresIn,
  });
};
