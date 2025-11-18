import "express-async-errors";
import SERVER_MODULE from "./configs/server.js";
import CONNECT_TO_MONGODB from "./configs/database.js";
import ROUTER_MODULE from "./routers/router.index.js";
import { errorHandler } from "./middlewares/middleware.errorHandler.js";

async function init() {
  await CONNECT_TO_MONGODB();
  const server = SERVER_MODULE();
  const router = ROUTER_MODULE();
  server.app.use(router);
  server.app.use(errorHandler);
  server.start();
}

init();