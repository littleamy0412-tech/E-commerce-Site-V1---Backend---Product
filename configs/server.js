import express from "express";
import cors from "cors";

import { SERVER_PORT } from "./dotenv.js";

function SERVER_MODULE(config = { port: SERVER_PORT }) {
  const app = express();
  const port = config.port;

  app.use(express.json());
  app.use(cors());

  return {
    app,
    port,
    async start() {
      app.listen(port, function () {
        console.log(`Server Running On Port:::${port}`);
      });
    },
  };
}

export default SERVER_MODULE;
