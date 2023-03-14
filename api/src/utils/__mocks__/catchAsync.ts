import { NextFunction, Response, Request } from "express";

export default (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void | Response<any, Record<string, any>>>
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      return "error";
    }
  };
