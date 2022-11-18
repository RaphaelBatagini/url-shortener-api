# Url Shortner API

This repository contains the code of a simple API to shorten URLs.

A front-end for this application can be found [here](https://github.com/RaphaelBatagini/url-shortener-front-end).

![Tests](https://github.com/RaphaelBatagini/url-shortener-api/actions/workflows/test.yml/badge.svg?branch=main)

## Technologies :computer:

- NodeJS
- Redis
- PostgreSQL
- Jest
- TypeORM
- Swagger

## Setup :gear:

1. Copy .env.example file to a new .env file and change any environment variable if needed;
2. Start docker with `docker-compose up` or `docker-compose up -d` and this will install all project dependencies;
3. Run migrations with this command:
```sh
docker-compose run url-shortener-api-development sh -c "yarn migration:run"
```

## Running tests :test_tube:
1. Run tests with:
```sh
docker-compose -f docker-compose.test.yml --env-file .env.test run url-shortener-api-test
```

2. Tests can be run with postgres database or an in memory database, you just have to change the REPOSITORY_TYPE in the .env.test file;

## Documentation :books:
Swagger documentation for the API can be found at `localhost:3000/docs`.

