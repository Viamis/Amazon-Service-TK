# Amazon Product Details 

> An app meant to mimic a typical Amazon product page

## Related Projects

  - https://github.com/Viamis/Amazon-Service-TK
  - https://github.com/Viamis/Amazon-Service-CN
  - https://github.com/Viamis/Amazon-Service-ML
  - https://github.com/Viamis/Amazon-Service-HL

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## CRUD API

Add new product:
```sh
POST /products
````

Get product by id:
```sh
GET /products/:id
```

Get product by name:
```sh
GET /products/name/:name
```

Update product info:
```sh
PATCH /products/:id
```

Delete product by id:
```sh
DELETE /products/:id/brand/:brand
```

Create about information:
```sh
POST /products/:id/about
```

Update about information:
```sh
PUT /products/:id/about
```

Add related product:
```sh
POST /products/:id/related/:id
```

Delete related product:
```sh
DELETE /products/:id/related/:id
```
