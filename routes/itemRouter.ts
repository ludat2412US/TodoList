import express, { NextFunction, raw, Request, Response } from "express"
import { logger } from "../lib/logger"
import { authenticationUser } from "../middlewares/authentication";
import { item, items } from "../config/data";


const router = express.Router();

router.post("/todos", authenticationUser, (req: Request, res: Response, next: NextFunction) => {
    const {payload, ...rawBody} = req.body;

    if (!rawBody) {
        logger.error("CREATE: todos is empty");
        res.status(401).json({
            success: false,
            message: "todos is empty"
        })
    }

    if (!rawBody.title) {
        logger.error("CREATE: todos title is empty");
        res.status(401).json({
            success: false,
            message: "todos title is empty"
        })
    }

    if (!rawBody.description) {
        logger.error("CREATE: todos description is empty");
        res.status(401).json({
            success: false,
            message: "todos description is empty"
        })
    }

    rawBody.id = payload.id;
    items[payload.id] = rawBody;
    
    logger.info("CREATE: success");
    res.status(201).json(rawBody);
})

router.put("/todos/:id", authenticationUser, (req: Request, res: Response, next: NextFunction) => {
    const rawBody = req.body as item;
    const id = req.body.payload.id;

    if (!rawBody) {
        logger.error("CREATE: todos is empty");
        res.status(401).json({
            success: false,
            message: "todos is empty"
        })
    }

    if (!rawBody.title) {
        logger.error("CREATE: todos title is empty");
        res.status(401).json({
            success: false,
            message: "todos title is empty"
        })
    }

    if (!rawBody.description) {
        logger.error("CREATE: todos description is empty");
        res.status(401).json({
            success: false,
            message: "todos description is empty"
        })
    }

    items[id].title = rawBody.title;
    items[id].description = rawBody.description;

    logger.info("UPDATE: success");
    res.status(201).json(items[id]);
})

router.delete("/todos/:id", authenticationUser, (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.payload.id;

    items.splice(id, 1);
    logger.info("DELETE: todos is deleted");
    res.status(204).json();
}) 

router.get("/todos", authenticationUser, (req: Request, res: Response, next: NextFunction) => {
    logger.info("GET: list todos");
    res.status(204).json({
        data: items,
        total: items.length
    })
})



export default router
