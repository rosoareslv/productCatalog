const express = require("express");
const swaggerUi = require("swagger-ui-express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const mongo = require("./functions/mongodb");

mongo()

const app = express();
app.use(cookieParser());

const openapi = JSON.parse(fs.readFileSync("./docs/openapi.json"));

const productSchemas = JSON.parse(
  fs.readFileSync("./docs/schemas/product.json")
);
const authSchemas = JSON.parse(fs.readFileSync("./docs/schemas/auth.json"));
const categorySchemas = JSON.parse(
  fs.readFileSync("./docs/schemas/category.json")
);

const authPaths = JSON.parse(fs.readFileSync("./docs/paths/auth.json"));
const productPaths = JSON.parse(fs.readFileSync("./docs/paths/product.json"));
const categorypaths = JSON.parse(fs.readFileSync("./docs/paths/category.json"));

openapi.paths = paths = { ...authPaths, ...productPaths, ...categorypaths };
openapi.components.schemas = {
  ...productSchemas,
  ...authSchemas,
  ...categorySchemas,
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use(logger("dev"));
app.use(express.json());

app.use("/auth", require("./middleware/redis"), require("./routes/auth"));

app.use("/", require("./middleware/token"), require("./middleware/mongodb"));

app.use("/product", require("./routes/product"));
app.use("/category", require("./routes/category"));

//Generic route for errors
app.use((err, req, res, next) => {
  console.log(err)
  if (err.name == "JsonWebTokenError") {
    return res.status(401).json({ message: "Token inválido" });
  } else if (err.name == "TokenExpiredError") {
    return res.status(401).json({ message: "Token expirado" });
  } else if (err.message.startsWith("Cast to ObjectId failed")) {
    return res.status(400).json({ message: "Parâmetro Id inválido" });
  }
  return res.status(500).json({ message: "Erro interno no servidor" });
});

//DONE certifcar pq a regeneracao de chave privada nao esta funcioonando com o restart do
//TODO refatorar respostas das apis (quanto menos info, melhor)
//TODO criar classes personalizadas de erro para padronizar lançamento de exceções
//TODO testar rotas de produtos e catalogos para ver se ainda funcionam

port = process.env.EXPRESS_PORT || 2000;

app.listen(port, () => {
  console.log(`ProductCatalog API running in ${port}`);
});

module.exports = app;
