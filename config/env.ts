import dotenv from "dotenv"
import { access } from "node:fs";

dotenv.config();

export const env = {
    port: process.env.PORT ?? 6000,
    logLevel: process.env.LOG_LEVEL ?? "info",
    nodeLevel: process.env.NODE_LEVEL ?? "development",
    isProduction: (process.env.NODE_LEVEL ?? "development") === "production",
    accessSecretToken: process.env.ACCESS_SECRET_TOKEN ?? "4be58d259d5b103518f4ab28a8f7a08a"
}

