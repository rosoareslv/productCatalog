const express = require('express');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const fs = require('fs')
const db = require('./helper/database')

const app = express();

const openapi = JSON.parse(fs.readFileSync("./docs/openapi.json"))

const productSchemas = JSON.parse(fs.readFileSync("./docs/schemas/product.json"))
const authSchemas = JSON.parse(fs.readFileSync("./docs/schemas/auth.json"))

const authPaths = JSON.parse(fs.readFileSync("./docs/paths/auth.json"))
const productPaths = JSON.parse(fs.readFileSync("./docs/paths/product.json"))

openapi.paths = paths = {...authPaths, ...productPaths}
openapi.components.schemas = {...productSchemas, ...authSchemas}


console.log(openapi)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

const client = db.connect()

app.use(logger('dev'));
app.use(express.json());

app.use("/", (req, res, next) => {
  req.client = client
  next()
})

app.use("/auth", require("./routes/auth"))
app.use("/product", require("./routes/product"))
app.use("/category", require("./routes/category"))

//adicionar o swagger para documentacao

port = process.env.EXPRESS_PORT || 2000;

app.listen(port, () => {
  console.log(`DBKO API running in ${port}`);
})

module.exports = app;
