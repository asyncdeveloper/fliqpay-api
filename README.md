# Node.js Express API with TypeScript 
> A REST API for a customer support ticketing system

## Description
This project was built in Node.js, Express, MongoDB and TypeScript .

## Project Features

##### Authentication
- JWT Authentication

##### Support Request
- Create/View a support request 
- Update a support request status 
- Generate report for support requests
- Comment on a support requests

##### Integration testing :
- Jest (https://jestjs.io/)
- Cypress (https://cypress.io)

## Project Scoping 
- A Support Agent can create and view requests
- A Customer can create / view and comment on created requests
- An Admin is authorized to perform all actions
- User Roles / Request Status stated in Model class as exposed to being persisted in the Database Layer
   - ##### Roles States [ 'customer', 'admin', 'support']
   - ##### Support Request Status States [ 'created', 'in_progress', 'closed' ]      

## Requirements
To run the API, you must install:
- **Node.js** (https://nodejs.org/en/download/)
- **MongoDB** (https://mongodb.com/)

## Running the API

Create an `.env` file using the command .You can use this config or change it for your purposes. 

```bash
cp .env.example .env
```

### Environment
Configure .env for development environment

```  
MONGO_URI=<YOUR_MONGO_DB_URI>
DB_NAME=<YOUR_MONGO_DB_NAME>
APP_PORT=<YOUR_APP_PORT>
DB_HOST=<YOUR_DB_HOST>
DB_PORT=<YOUR_DB_PORT>
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRATION=<YOUR_JWT_EXPIRATION_TIME>
```

Install Dependencies
```
npm install
```

Start the application in development environment:
```
npm start
```
Express server listening on http://localhost:3001/, in development mode

## Testing 
Configure .env.testing for testing environment

To run integration tests: 
```bash
npm run test:integration
```

To run unit tests: 
```bash
npm run test:unit
```

### API documentation:
API End points and documentation can be found at
[Postman Documentation](https://documenter.getpostman.com/view/5928045/T17J9Sja?version=latest)
