import express from "express";
import Router from "src/router";
import cors from "cors";
// import errorHandler from "src/middleware/errorHandler";

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());

  app.disable("x-powered-by");

  Router(app);

  // app.use(errorHandler);

  return app;
};

export { createServer };
