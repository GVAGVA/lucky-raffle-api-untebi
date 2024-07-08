import { createServer } from "./config/express";
import http from "http";
import Router from "./router";
import { PrismaService } from "./utils/prisma";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || "5000";
const DbDriver = process.env.DATABASE_DRIVER || "postgres";

const startServer = async () => {
  // create express server
  const app = await createServer();

  // DB set up
  new PrismaService(DbDriver as any);

  // Routes set up
  Router(app);

  const server = http.createServer(app).listen({ host, port }, () => {
    console.log(`Server ready at http//${host}:${port}`);
  });

  const signalTraps: NodeJS.Signals[] = ["SIGTERM", "SIGINT", "SIGUSR2"];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log("HTTP server closed");
      });
    });
  });
};

startServer();
