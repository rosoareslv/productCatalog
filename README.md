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
