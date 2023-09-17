# SocialSwayer API
Node.js (Express.JS and TypeScript) API for distributing data for the SocialSwayer front-end.

## Build
The backup of the Mysql database can be found in the /database/ directory. 

A MySQL database should be built with these files. 

The connection details must be updated in /src/database.ts prior to building. 

To build the typescript run the following command.

```bash
npm install
npx tsc
```

## Hosting
To run the server on the default http://localhost:3000 run the following command:

```bash
node dist/index.js
```

## Usage
A Postman.json file can be found in the root of the repo for examples on the following API endpoints:

```bash
/api/news
/api/guides
/api/links
/api/plans?id=:id
```
