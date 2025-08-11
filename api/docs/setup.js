import { readFileSync } from 'fs';

const openapi = JSON.parse(readFileSync("./docs/openapi.json"));

const productSchemas = JSON.parse(
  readFileSync("./docs/schemas/product.json")
);
const authSchemas = JSON.parse(readFileSync("./docs/schemas/auth.json"));
const categorySchemas = JSON.parse(
  readFileSync("./docs/schemas/category.json")
);

const authPaths = JSON.parse(readFileSync("./docs/paths/auth.json"));
const productPaths = JSON.parse(readFileSync("./docs/paths/product.json"));
const categorypaths = JSON.parse(readFileSync("./docs/paths/category.json"));

openapi.paths = { ...authPaths, ...productPaths, ...categorypaths };
openapi.components.schemas = {
  ...productSchemas,
  ...authSchemas,
  ...categorySchemas,
};

export default openapi
