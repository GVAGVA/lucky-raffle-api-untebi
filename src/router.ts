import { Application } from "express";
import { RaffleController } from "./controllers/raffle-controller";

const Router = (app: Application) => {
  app.get("/raffle", (req, res) =>
    new RaffleController().handleRaffleRequest(req, res)
  );
};

export default Router;
