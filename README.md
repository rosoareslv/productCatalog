## ProductCatalog API

This project of API was created firt to implement the best practices of building APIs, after handling a business logic Product and Categories for multiple clients, something which was created to feed an e-commerce, for example.

#### Stack

- Nodejs - Runtime
  - ExpressJS - Api framework
  - Mongoose - MongoDB schemas and functions
  - Jest - Tests
- :snake: Python - Create fake data
- :whale: Docker - Setup environments 
- :four_leaf_clover: MongoDB - Database
- :red_circle: Redis - Security

#### Security

- JWT authentication
- AccessToken + RefresToken
- Whitelist control of refreshTokens

#### Documentation

When app is running, go to */docs* endpoint.It follows the openapi specification

#### Development Deploy

```bash
docker compose -f docker-compose.dev.yaml up
```

#### Test Execution

```bash
docker compose -f docker-compose.test.yaml up
```

### Generate fake data

Run a script to create fake data for performance and development contexts inside 'mock' folder

```bash
python script.py
```