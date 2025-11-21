import jwt from "jsonwebtoken";
import Types from "mongoose";

export type UserPayload = {
  id: string | Types.ObjectId;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};

//JWT nunca debe ir información sensible
//Solo el id
