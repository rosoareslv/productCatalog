## ProductCatalog API

This project was created to implement the best practices about creating robust APIs.

#### Stack

- Nodejs - Runtime
  - ExpressJS - Api framework
  - Mongoose - MongoDB schemas and functions
  - Jest - Tests
- :whale: Docker - Setup environments
- :four_leaf_clover: MongoDB - Database
- :red_circle: Redis - Security

#### Security

- JWT authentication
- AccessToken + RefreshToken
- Whitelist control of refreshTokens

#### JWT implementation flow comparison

<div align="center">
<p><b>JWT without Refresh Token</b></p>
<img src="./docs/jwtWithoutRefreshToken.png" width="600" alt="JWT without refresh token">
</div>

#### Documentation

When app is running, go to _/docs_ endpoint. It follows the openapi specification

#### Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | — | Register a new user |
| POST | `/auth/login` | — | Authenticate and return an access token (refresh token is set as an HTTP cookie) |
| GET | `/auth/refresh` | Refresh token (cookie) | Issue a new access token |
| GET | `/product` | Access token | List all products of the authenticated user |
| GET | `/product/:id` | Access token | Get a product by ID |
| POST | `/product` | Access token | Create a product (category must exist) |
| PATCH | `/product/:id` | Access token | Update a product |
| DELETE | `/product/:id` | Access token | Delete a product |
| GET | `/category` | Access token | List all categories of the authenticated user |
| GET | `/category/:id` | Access token | Get a category by ID |
| POST | `/category` | Access token | Create a category |
| PATCH | `/category/:id` | Access token | Update a category |
| DELETE | `/category/:id` | Access token | Delete a category |
| GET | `/docs` | — | Swagger UI (OpenAPI documentation) |


- Access token must be sent in the `Authorization` header. 
- Products and categories are scoped to their owner. 
- A user can only see and change their own records.

#### Development Deploy

```bash
docker compose -f docker-compose.yaml up api
```

#### Test Execution

```bash
docker-compose -f docker-compose.yaml up test
```

#### To implement:

- Fake data generator for performance workload tests
- CI/CD

#### Key improvements:

- Validations Can Be More Rigorous (may add email field and validation)
- Input sanitization (express-validator)
- Rate limiting
- Performance metrics
- Structured logs
- Healthcheck
- Set resources usage (CPU, RAM...) in compose files
- Two factor authentication
