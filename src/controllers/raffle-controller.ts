import { Request, Response } from "express";
import { giveAwayHandler } from "src/services/raffle-service";

class RaffleController {
  constructor() {}

  async handleRaffleRequest(req: Request, res: Response) {
    await giveAwayHandler(req, res);
  }
}

export { RaffleController };
