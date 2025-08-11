const request = require("supertest");
const app = require("../app");

const agent = request.agent(app); // the cookies are saved and redirected automatically

let accessToken;
let refreshToken;

describe("Endpoints /product", () => {
  
  it("POST /auth/product - Criar produto", async () => {
    const res = await agent
      .post("/auth/register")
      .send({ name: "Rodrigo", username: "teste", password: "123" });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual({});
  });

  it("GET /auth/product -  Buscar produto", async () => {
    const res = await agent
      .post("/auth/register")
      .send({ name: "Rodrigo", username: "teste", password: "123" });
    expect(res.status).toEqual(403);
    expect(res.type).toEqual("application/json");
    expect(res.body).toEqual({
      message: "Username indisponível",
      username: "teste",
    });
  });

  describe("Teste na autenticação de usuário", () => {
    it("POST /auth/login - Garantir Acesso", async () => {
      const res = await agent
        .post("/auth/login")
        .send({ username: "teste", password: "123" });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual("application/json");
      expect(res.body).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"][0]).toContain("refreshToken=");

      accessToken = res.body.accessToken;
      refreshToken = res.headers["set-cookie"][0].split(";")[0]?.split("=")[1];
    });

    it("POST /auth/login - Usuário inexistente", async () => {
      const res = await agent
        .post("/auth/login")
        .send({ username: "naoExiste", password: "123" });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual("application/json");
    });

    it("POST /auth/login - Usuário com senha errada", async () => {
      const res = await agent
        .post("/auth/login")
        .send({ username: "teste", password: "456" });
      expect(res.status).toEqual(401);
      expect(res.type).toEqual("application/json");
    });

    it("GET /auth/refresh - Gerar novos AccessToken e RefreshToken", async () => {
      const res = await agent.get("/auth/refresh");
      expect(res.status).toEqual(200);
      expect(res.type).toEqual("application/json");
      expect(res.body).toHaveProperty("accessToken");
      expect(res.headers["set-cookie"][0]).toContain("refreshToken=");
      expect(res.body.accessToken).not.toEqual(accessToken);
      expect(res.headers["set-cookie"][0]).not.toEqual(refreshToken);
    });
  });
});
