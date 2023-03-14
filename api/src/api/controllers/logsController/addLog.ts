import { NextFunction, Request, Response } from "express";
import Log from "../../../models/Log";
import User from "../../../models/User";
import APIFeatures from "../../../utils/apiFeatures";
import AppError from "../../../utils/appError";
import catchAsync from "../../../utils/catchAsync";
import { splitLogMessage } from "../../../utils/logs";
import { validateCreateLogData, validateLog } from "../../validators/logs";
import { validateUser } from "../../validators/user";

export default catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { logMessage, email, name } = req.body;

    const formDataError = await validateCreateLogData(req.body);
    if (formDataError) return next(new AppError(formDataError, 400));

    const logDataError = await validateLog(logMessage);
    if (logDataError) return next(new AppError(logDataError, 400));

    const userData = {
      email,
      name,
    };

    const userDataError = await validateUser(userData);
    if (userDataError) return next(new AppError(userDataError, 400));

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ ...userData });

    const logSplited = splitLogMessage(logMessage);
    const newLog = await Log.create({
      ...logSplited,
      user,
    });

    return res.status(200).json(newLog);
  }
);

/**
 * @swagger
 * /logs/add:
 *    post:
 *      summary: Add log
 *      consumes:
 *         - application/json
 *      parameters:
 *        - in: body
 *          name: log
 *          schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              log:
 *                type: string
 *      tags:
 *        - Logs
 */
