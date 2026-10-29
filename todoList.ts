import express from "express"
import { notFound } from "./middlewares/notFound";
import { handledError } from "./middlewares/handledError";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import authRouter from "./routes/authRouter"
import itemRouter from "./routes/itemRouter"
import { refreshToken } from "./middlewares/refreshToken";

const server = express();

server.use(express.json());

(() => {
    server.use("/api", authRouter);
    server.use("/api", itemRouter);
    server.post("/refresh", refreshToken);
    server.use(notFound);
    server.use(handledError);
})()

server.listen(env.port, () => {
    logger.info("Server is running...");
})