import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    console.log("🛰️ Petición desde:", origin);
    const whiteList = [process.env.FRONTEND_URL, "http://localhost:5173"];

    if (process.argv[2] === "--api") {
      whiteList.push(undefined);
    }

    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
  credentials: true,
};
