import jwt from "jsonwebtoken";
import Types from "mongoose";

type UserPayload = {
  id: string;
};

export const generateJWT = (payload: UserPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "6m",
  });
  return token;
};

//JWT nunca debe ir información sensible
//Solo el id
