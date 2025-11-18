import jwt from "jsonwebtoken";
import { JWTSECRET } from "../configs/dotenv.js";

function authToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res
      .status(401)
      .json({ message: "No Token Provided. Authorization denied." });

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, JWTSECRET);

  req.user = decoded;
  next();
}

export default authToken