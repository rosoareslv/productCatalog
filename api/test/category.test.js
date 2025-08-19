import request from "supertest";
import app from "../app.js";

const agent = request.agent(app);

const resToken = await agent
  .post("/auth/login")
  .send({ username: "teste", password: "123" });

const header = {
  Authorization: "Bearer " + resToken.body.accessToken,
};

let categoryId = null

describe("Endpoints /category", () => {
  it("POST /category - Criar categoria", async () => {
    const res = await agent.post("/category").set(header).send({
      title: Math.random().toString(36).substring(2),
      description: "teste automatizado",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("_id");

    categoryId = res.body._id
  });


  it("GET /category/:id - Buscar Categoria", async () => {
    const res = await agent.get(`/category/${categoryId}`).set(header)
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("_id");
  });

  it("GET /category - Buscar todos as categorias", async () => {
    const res = await agent.get("/category/").set(header)
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(Array.isArray(res.body.categories)).toEqual(true);
    
  });

  it("DELETE /category - Deletar categoria", async () => {
    const res = await agent.delete(`/category/${categoryId}`).set(header);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("description");
    expect(res.body).toHaveProperty("ownerId");
    expect(res.body).toHaveProperty("_id");    
  });
})

