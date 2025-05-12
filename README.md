# node-crud-API
This is simple CRUD API using in-memory database underneath.

## Instruction:

1. Please clone this repo with `git clone <repository-url>`;
2. Switch branch to **develop**;
3. Install all dependencies `npm install`;
4. Create `.env` file with PORT (ex: PORT=3000);
5. For running dev mode use `npm run start:dev` after that you can check API with Postman:
    -GET url example `http://localhost:3000/api/users`;
    -POST url example `http://localhost:3000/api/users` don't forget create body for POST request;
    -PUT url example `http://localhost:3000/api/users/${userID}`;
    -DELETE url example `http://localhost:3000/api/users/${userID}`;
6. For running production mode `npm run start:prod`;
7. For running load balancer `npm run start:multi`;
8. To check tests run `npm test`;
