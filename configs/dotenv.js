import { config } from "dotenv";
config();

export const SERVER_PORT = process.env.SERVER_PORT;
export const SALTROUNDS = process.env.SALTROUNDS;
export const MONGO_URI = process.env.MONGO_URI;
export const JWTSECRET = process.env.JWTSECRET;
export const NODE_ENV = process.env.NODE_ENV;
