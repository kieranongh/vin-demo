

# Wine Search Backend 

A backend API for searching for and inspecting wine batches or Lots.

Lots can be searched for by a query string, details of a lot retrieved and each lot's components can be listed and broken down based on a number of properties: **Year**, **Variety**, **Region** and **Year/Variety** combination

There is a UI built to interact with this API [Wine Search Frontend](https://github.com/kieranongh/vin-fe)

## Installation


```bash
> git clone https://github.com/kieranongh/vin-demo
> cd vin-demo
> npm install
```

## Running the app

The default port is 43000 or set your own  
```bash
export API_PORT=3000
```

To start the app  
```bash
# development
> npm run start

# watch mode
> npm run start:dev

# production mode
> npm run start:prod
```

## Available endpoints

#### `GET /api/search?query={query}`
Searches for and returns an array of Lots for the given `query`  
Matches the query against `lotCode` and `description`

#### `GET /api/lots/{lotCode}`
Retrieve a Lot for the given `lotCode`

#### `GET /api/breakdown/year/{lotCode}`
Lists a breakdown of the given Lot's components according to year

#### `GET /api/breakdown/variety/{lotCode}`
Lists a breakdown of the given Lot's components according to variety

#### `GET /api/breakdown/region/{lotCode}`
Lists a breakdown of the given Lot's components according to region

#### `GET /api/breakdown/year-variety/{lotCode}`
Lists a breakdown of the given Lot's components according to year and variety combination


## Framework

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Built with Nest, a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## License

Nest is [MIT licensed](LICENSE).
