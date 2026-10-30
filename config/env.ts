import dotenv from "dotenv"

dotenv.config();

export const env = {
    port: process.env.PORT ?? 6000,
    logLevel: process.env.LOG_LEVEL ?? "info",
    nodeLevel: process.env.NODE_LEVEL ?? "development",
    isProduction: (process.env.NODE_LEVEL ?? "development") === "production",
    accessSecretToken: process.env.ACCESS_SECRET_TOKEN ?? "4be58d259d5b103518f4ab28a8f7a08a",
    refreshSecretToken: process.env.REFRESH_SECRET_TOKEN ?? "9d892053d540db8ece4ab86a864cfe8f"
}


