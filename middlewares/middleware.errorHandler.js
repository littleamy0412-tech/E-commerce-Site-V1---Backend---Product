import { NODE_ENV } from "../configs/dotenv.js";

export function errorHandler(err, req, res, next) {
  console.error(err.status || 500, "....", err.message || "Internal Server Error");
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: NODE_ENV === "development" ? err.stack : undefined,
  });
}

