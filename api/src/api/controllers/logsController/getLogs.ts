import { NextFunction, Request, Response } from "express";
import APIFeatures from "../../../utils/apiFeatures";
import Log from "../../../models/Log";
import catchAsync from "../../../utils/catchAsync";
import { validateLogListParams } from "../../validators/logs";
import AppError from "../../../utils/appError";

export default catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new APIFeatures(req).filter();
    const query = features.query;

    const paramsError = await validateLogListParams(query);
    if (paramsError) return next(new AppError(paramsError, 400));

    const logs = await Log.find(query);

    return res.status(200).json(logs);
  }
);

/**
 * @swagger
 * /logs:
 *    get:
 *      summary: Get Logs
 *      parameters:
 *        - in: query
 *          name: type
 *          schema:
 *            type: string
 *          description: Enum parameter E, W, I
 *        - in: query
 *          name: severity
 *          schema:
 *            type: string
 *          description: Number parameter min 0 max 100
 *        - in: query
 *          name: timestamp
 *          schema:
 *            type: number
 *          description: Number parameter
 *      tags:
 *        - Log
 *      responses:
 *        "200":
 *          description: get logs.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Log'
 */
