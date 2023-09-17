# SocialSwayer API
Node.js (Express.JS and TypeScript) API for distributing data for the SocialSwayer front-end.

SocialSwayer is an SEO managed services tool which requires a user subscription, the main use of this API is to remotely deliver information and news to these remotely managed services.  

## Build and Host (With Docker)
This project can be entirely ran within docker with the following command, no further changes are required.

Please see the postman.json import for details on each API endpoint.

```bash
docker-compose up --build -d
```

## Usage
The main use of this project is to host API endpoints used by a front-end.

documentation can also be found on https://documenter.getpostman.com/view/8587850/2s9YC7TBpU

A Postman.json file can be found in the root of the repo for examples.

API Endpoint  | Usage
------------- | -------------
/api/news | Returns a list of public news articles
/api/guides  | Returns a list of public tutorials and guides
/api/links   |   Returns a public list of affiliate links
/api/plans?id=:id  |   Returns an authorised list of the users current subscriptions

## File Structure
Here is a list of the main project files and their structure. 

Location  | Usage
------------- | -------------
/database/  | Contains .sql files for building MySQL
/src/  | Main root for project files
/src/index.ts   |   API Router and main server config
/classes/api  |   Contains classes for each API Endpoint
/classes/auth.ts   |   Auth class location
/classes/types.ts   |   Entry type TS definitions
/classes/database/database.ts   |   Contains connection functions for the database
/classes/database/queries.ts  |   Contains all of the database queries used

### Build (Without Docker)
The backup of the Mysql database can be found in the /database/ directory. 

A MySQL database should be built with these files. 

The connection details must be updated in /src/database.ts prior to building. 

To build the typescript run the following command.

```bash
npm install
npx tsc
```

### Host (Without Docker)
To run the server on the default http://localhost:3000 run the following command:

```bash
node dist/index.js
```