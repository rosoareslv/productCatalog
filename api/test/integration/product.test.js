import request from "supertest";
import app from "../../app.js";

const agent = request.agent(app);

let header = null;
let productId = null;
let category = null;

beforeAll(async () => {
  let username = Math.random().toString().substring(2, 15);
  //create user
  await agent.post("/auth/register").send({
    name: "testUser",
    username: username,
    password: "12345678",
  });
  //authenticate
  const resToken = await agent
    .post("/auth/login")
    .send({ username: username, password: "12345678" });
  header = {
    Authorization: "Bearer " + resToken.body.accessToken,
  };
  //create random category
  const resCategory = await agent
    .post("/category")
    .set(header)
    .send({
      title: Math.random().toString(36).substring(2),
      description: "teste automatizado",
    });
  category = resCategory.body.title;
});

describe("Endpoints /product", () => {
  it("POST /product - Create product", async () => {
    const res = await agent.post("/product").set(header).send({
      title: "Playstation 6",
      description: "console da décima geração da Sony",
      price: 6000,
    });
    expect(res.status).toEqual(201);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");

    productId = res.body._id;
  });

  it("POST /product - Create product with invalid body", async () => {
    const res = await agent.post("/product").set(header).send({
      title: "XBOX 720",
      description: "Console brabo da Microsoft",
    });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("message");
  });

  it("PATCH /product/:id - Update product with nonexistent category", async () => {
    const res = await agent.patch(`/product/${productId}`).set(header).send({
      category: "falseCategory",
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("message");
  });

  it("PATCH /product/:id - Update product with valid category", async () => {
    const res = await agent.patch(`/product/${productId}`).set(header).send({
      category: category,
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body.category).toEqual(category);
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");
  });

  it("GET /product/:id - Get product", async () => {
    const res = await agent.get(`/product/${productId}`).set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("modifiedAt");
    expect(res.body).toHaveProperty("_id");
  });

  it("GET /product - Get all products", async () => {
    const res = await agent.get("/product").set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(Array.isArray(res.body.products)).toEqual(true);
  });

  it("DELETE /product - Delete product", async () => {
    const res = await agent.delete(`/product/${productId}`).set(header);
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
