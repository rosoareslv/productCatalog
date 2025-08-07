const fs = require("fs");

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

module.exports = openapi;
