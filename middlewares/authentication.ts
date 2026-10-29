import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import jwt from "jsonwebtoken" 
import { env } from "../config/env";
import { tokenPayload } from "../config/data";

export function authenticationUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const reqId = Number(req.params.id);
    const headers = req.headers["authorization"];
    const token = headers ? headers.split(" ")[1] : undefined;

    if (token) {
        jwt.verify(token, env.accessSecretToken, (err, payload) => {
            if (err) {
                logger.info("Verify accessToken: Error");
                return res.status(401).json(err);
            }
            else {
                const userPayload = payload as tokenPayload;
                if (userPayload.role == "admin") {
                    req.body.payload = userPayload;
                    return next(); 
                }

                if (reqId && userPayload.id != reqId) {
                    logger.error("Verify accessToken: forbidden");
                    return res.status(401).json({
                        message: "Forbidden"
                    })
                }
                req.body.payload = userPayload;
                return next(); 
            }
        })
    }
    else {
        logger.error("Verify accessToken: unauthorized");
        res.status(401).json({
            message: "Unauthorized"
        })
    }

}