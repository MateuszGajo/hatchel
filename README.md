# Logger


## Installation

Application requires [Node.js](https://nodejs.org/) and docker [Docker](https://www.docker.com/) to run .

Install the dependencies and devDependencies and start the server.

Run client
```sh
cd client
npm i
npm run start
```

Run api\
BEFORE RUN: create .env and copy content of .env.example
```sh
cd api
npm i
docker-compose up
npm run start
```

## test
unit and integration
```sh
cd client
npm run test
```
unit and integration
```sh
cd api
npm run test
```
E2e

```sh
cd api
npm run start
```
```sh
cd client
npm run start
npm run cypress
```
