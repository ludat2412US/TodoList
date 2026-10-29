import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import jwt from 'jsonwebtoken';
import { env } from "../config/env"; 
import bodyparser from "body-parser"

export function refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(406).json({
        message: "Refresh token is empty"
    });

    try {
        const payload = jwt.verify(token, env.refreshSecretToken) as {username: string, role: string, id: number};
        const newAccessToken = jwt.sign(payload, env.accessSecretToken, {expiresIn: "10m"});
        res.status(201).json({
            token: newAccessToken
        });
    }
    catch (err) {
        res.status(406).json({
            message: "Invalid or expired RefreshToken"
        }) 
    }
}