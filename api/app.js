import express from "express";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import openApi from "./docs/setup.js";

import { createSSHKeys } from "./functions/ssh.js";
import { connect as connectMongo } from "./functions/mongodb.js";
import { connect as connectRedis } from "./functions/redis.js";

import { getAccessToken } from "./middleware/token.js";
import { getUserUUID } from "./middleware/user.js";
import { defaultError, invalidEndpoint } from "./middleware/handlers.js";

import { defineLogLevel } from "./functions/logger.js";

import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";

await createSSHKeys();
await connectMongo();
await connectRedis();

const app = express();
app.use(cookieParser());

defineLogLevel(app, process.env.NODE_ENV)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApi));

app.use(express.json());

app.use("/auth", authRouter);
app.use("/product", getAccessToken, getUserUUID, productRouter);
app.use("/category", getAccessToken, getUserUUID, categoryRouter);
app.use(defaultError)
app.use("*", invalidEndpoint)

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`API OK`);
  });
}

export default app;
