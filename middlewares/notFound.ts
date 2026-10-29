import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";


export function notFound(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error("Not found path");

    res.status(500).json({
        success: false,
        message: "Not found path"
    })
}