const express = require('express');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const fs = require('fs')
const { connect, getUserUUID } = require('./helper/database')
const { checkToken } = require("./helper/token")
const { exec } = require('child_process');

const app = express();

exec("ssh-keygen -t rsa -b 4096 -m PEM -f ./keys/id_rsa -N ''")

const openapi = JSON.parse(fs.readFileSync("./docs/openapi.json"))

const productSchemas = JSON.parse(fs.readFileSync("./docs/schemas/product.json"))
const authSchemas = JSON.parse(fs.readFileSync("./docs/schemas/auth.json"))

const authPaths = JSON.parse(fs.readFileSync("./docs/paths/auth.json"))
const productPaths = JSON.parse(fs.readFileSync("./docs/paths/product.json"))

openapi.paths = paths = { ...authPaths, ...productPaths }
openapi.components.schemas = { ...productSchemas, ...authSchemas }

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

//mongoDB connection
connect()

app.use(logger('dev'));
app.use(express.json());

app.use("/auth", require("./routes/auth"))

app.use("/", checkToken, getUserUUID, (req, res, next) => {
  next()
})

app.use("/product", require("./routes/product"))
app.use("/category", require("./routes/category"))

//Error handler
app.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    let fields = {}
    for (let field in err.errors) {
        fields[field] = {
          value: err.errors[field].value,
          kind: err.errors[field].kind
        }
    }
    return res.status(500).json({ "message": "Erro na validação", "campos": fields })
  } else if ( err.name == "CastError") {
    field = {
      field: err.path,
      value: err.value,
      kind : err.kind,
    }
    return res.status(500).json({ "message": "Erro no parse de dados", "campo": field })
  }
  return res.status(500).json({ "message": "Erro interno no servidor" })
})

port = process.env.EXPRESS_PORT || 2000;

app.listen(port, () => {
  console.log(`DBKO API running in ${port}`);
})

module.exports = app;
