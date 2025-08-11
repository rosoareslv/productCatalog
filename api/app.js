const express = require("express");
const swaggerUi = require("swagger-ui-express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const openapi = require("./docs/setup");

require("./functions/ssh")
require("./functions/mongodb")

const app = express();
app.use(cookieParser());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.use(logger("dev"));
app.use(express.json());

app.use("/auth", require("./middleware/redis"), require("./routes/auth"));

app.use("/product", require("./middleware/token"), require("./middleware/mongodb"), require("./routes/product"));
app.use("/category", require("./middleware/token"), require("./middleware/mongodb"), require("./routes/category"));

app.use("*", (req,res,next) => {
    res.status(404).json("endpoint nao existente")
})

app.use((err, req, res, next) => {
  console.log(err);
  if (err.message.startsWith("Cast to ObjectId failed")) {
    return res.status(400).json({ message: "Parâmetro Id inválido" });
  }
  return res.status(500).json({ message: "Erro interno no servidor" });
});

port = process.env.EXPRESS_PORT || 2000;

app.listen(port, () => {
  console.log(`ProductCatalog API running in ${port}`);
});

module.exports = app;
