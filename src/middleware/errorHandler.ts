export { Request, Response, NextFunction } from "express";

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headerSent) return next(error);

  res.status(500).send(error.message);
};

export default errorHandler;
