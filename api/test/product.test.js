import request from "supertest";
import app from "../app.js";

const agent = request.agent(app);

const resToken = await agent
  .post("/auth/login")
  .send({ username: "teste", password: "123" });

const header = {
  Authorization: "Bearer " + resToken.body.accessToken,
};

let product_id = null;

const resCategory = await agent.post("/category").set(header).send({
  title: "console",
  description: "consoles e acessórios",
})

let category = resCategory.body.title

describe("Endpoints /product", () => {
  it("POST /product - Criar Produto", async () => {
    const res = await agent.post("/product").set(header).send({
      title: "Playstation 6",
      description: "console da décima geração da Sony",
      price: 6000,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");

    product_id = res.body._id;
  });

  it("PATCH /product/:id - Atualizar Produto adicionando Categoria que não existe", async () => {
    const res = await agent.patch(`/product/${product_id}`).set(header).send({
      category: "categoriaNaoExiste",
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });

  it("PATCH /product/:id - Atualizar Produto adicionando Categoria que existe", async () => {
    const res = await agent.patch(`/product/${product_id}`).set(header).send({
      category: category,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body.category).toEqual(category)
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");
  });

  it("GET /product/:id - Buscar Produto", async () => {
    const res = await agent.get(`/product/${product_id}`).set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");
  });

  //It needs to have at least one product to return json with array
  it("GET /product - Buscar todos os produtos", async () => {
    const res = await agent.get("/product").set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(Array.isArray(res.body.products)).toEqual(true);
  });

  it("DELETE /product - Deletar produto", async () => {
    const res = await agent.delete(`/product/${product_id}`).set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");
  });
});
