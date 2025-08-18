import express from "express";
import swaggerUi from "swagger-ui-express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import openApi from "./docs/setup.js";
import fs from "fs";

import { createSSHKeys } from "./functions/ssh.js";
import { connectMongo } from "./functions/mongodb.js";
import { connectRedis } from "./functions/redis.js"

import { getConnection } from "./middleware/redis.js";
import { getTokenInfo } from "./middleware/token.js";
import { getUserUUID } from "./middleware/mongodb.js";

import authRouter from "./routes/auth.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";

await createSSHKeys();
await connectMongo();
await connectRedis();

const app = express();
app.use(cookieParser());

if (process.env.NODE_ENV === "test") {
  app.use(
    logger("combined", {
      stream: fs.createWriteStream("/logs/testLog.log", { flags: "a" }),
    })
  );
} else if (process.env.NODE_ENV === "production") {
  app.use(
    logger("combined", {
      stream: fs.createWriteStream("/logs/prodLog.log", { flags: "a" }),
    })
  );
} else {
  app.use(logger("dev"));
}

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApi));

app.use(express.json());

app.use("/auth", getConnection, authRouter);
app.use("/product", getTokenInfo, getUserUUID, productRouter);
app.use("/category", getTokenInfo, getUserUUID, categoryRouter);

app.use("*", (req, res, next) => {
  res.status(404).json("endpoint não existente");
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.message.startsWith("Cast to ObjectId failed")) {
    return res.status(400).json({ message: "Parâmetro Id inválido" });
  }
  return res.status(500).json({ message: "Erro interno no servidor" });
});

const port = process.env.EXPRESS_PORT || 2000;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`ProductCatalog API running in ${port}`);
  });
}

export default app;
