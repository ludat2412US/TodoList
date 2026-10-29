import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";


export function handledError(
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error("Found from server - Unhandled error");

    res.status(500).json({
        success: false,
        message: "Internal error"
    })
}