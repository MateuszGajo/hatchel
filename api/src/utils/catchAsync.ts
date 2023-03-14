import { NextFunction, Response, Request } from "express";

export default (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void | Response<any, Record<string, any>>>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
