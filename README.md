##### ProductCatalog API

This project of API was created firt to implement the best practices of building APIs, after handling a business logic Product and Categories for multiple clients, something which was created to feed a ecommerce, for example.

### Stack

- Nodejs 
    - ExpressJS 
    - Mongoose 
- :whale: Docker
- :four_leaf_clover: MongoDB
- :red_circle: Redis

### Security

- JWT authentication
- AccessToken + RefresToken
- Whitelist controle of refreshTokens

### Documentation

### Development Deploy

``` bash 
docker compose -f docker-compose.dev.yaml up
```

### Test Execution


``` bash 
#Run application
docker compose -f docker-compose.test.yaml up -d

#See Log from api container
docker compose -f docker-compose.test.yaml logs api 
```