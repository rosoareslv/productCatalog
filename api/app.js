const express = require('express');
const logger = require('morgan');
const db = require('./helper/database')
const app = express();
const client = db.connect()

app.use(logger('dev'));
app.use(express.json());

app.use("/",(req, res, next) => {
    req.client = client
    next()
})

app.use("/product", require("./routes/product"))
app.use("/category", require("./routes/category"))

//adicionar o swagger para documentacao

port = process.env.EXPRESS_PORT || 2000;

app.listen(port, () => {
  console.log(`DBKO API running in ${port}`);
})

module.exports = app;
