import express, { NextFunction, Request, Response } from "express"
import { accounts, user } from "../config/data";
import { logger } from "../lib/logger";
import bcrypt from "bcrypt"
import { log } from "node:console";
import jwt from "jsonwebtoken"
import { env } from "../config/env";
import cookieparser from "cookie-parser";

const router = express.Router();
router.use(cookieparser());

router.post("/signup", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as user;
 
    if (!body) {
        logger.error("SIGNUP - Undefind info of user");
        res.status(401).json({
            success: false,
            message: "Please enter usernam, email and password"
        })
    }

    if (!body.username) {
        logger.error("SIGNUP - username is empty");
        res.status(401).json({
            success: false,
            message: "Please enter username"
        })
    }

    if (!body.email) {
        logger.error("SIGNUP - email is empty");
        res.status(401).json({
            success: false,
            message: "Please enter email"
        })
    }
    else if (accounts.find(user => user.email === body.email)) {
        logger.error("SIGNUP - email is already exist");
        res.status(401).json({
            success: false,
            message: "Email is already exist"
        })
    }

    if (!body.password) {
        logger.error("SIGNUP - password is empty");
        res.status(401).json({
            success: false,
            message: "Please enter password"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        body.id = accounts.length;
        body.password = hashedPassword;
        accounts.push(body);

        logger.info("Sign up successfully");
        res.status(201).json({
            success: true,
            message: "Sign up successfully"
        })

    }
    catch (err) {
        res.status(401).json("error from sign-up");
    }
})

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!body) {
        logger.error("LOGIN - Undefind info of user");
        res.status(401).json({
            success: false,
            message: "Please enter usernam and password"
        })
    }

    if (!body.username) {
        logger.error("LOGIN - username is empty");
        res.status(401).json({
            success: false,
            message: "Please enter username"
        })
    }

    if (!body.password) {
        logger.error("LOGIN - password is empty");
        res.status(401).json({
            success: false,
            message: "Please enter password"
        })
    }


    try {
        const _user = accounts.find(user => user.username === body.username);
        if (!_user) {
            logger.error("LOGIN - can not find user");
            return res.status(401).json({
                success: false,
                message: "Can not find user"
            })
        }
        else {
            if (await bcrypt.compare(body.password, _user.password)) {
                const accessToken = jwt.sign({username: _user.username, role: "user", id: _user.id}, env.accessSecretToken, {expiresIn: "10m"});
                const refreshToken = jwt.sign({username: _user.username, role: "user", id: _user.id}, env.refreshSecretToken, {expiresIn: "1d"});
                res.cookie("refreshToken", { //Save in database
                    httpOnly: true,
                    sameSite: 'none', 
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000
                });

                if (accessToken) {
                    logger.info("LOGIN - Log in successfully");
                    res.status(201).json({
                        success: true,
                        message: "Welcome",
                        token: accessToken
                    })
                }
            }
            else {
                logger.error("LOGIN - Wrong password");
                return res.status(401).json({
                    success: false,
                    message: "Wrong password"
                })
            }
        }
    }
    catch (err) {
        res.status(501).json();
    }    
})


export default  router;

