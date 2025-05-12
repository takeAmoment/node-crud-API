import http from 'http';

import { findRoute } from './utils/utils';
import { IUser } from './types/types';

export const createServer = (port: number | string, getUsers: () => Array<IUser>) => {
  const server = http.createServer((req, res) => {
    const users = getUsers();
    const pathname = req.url || '';
    const method = req.method || 'GET';
    findRoute({ method, pathname, req, res, users });
  });

  return server;
};

export const startProgram = (port: number | string, getUsers: () => Array<IUser>) => {
  const server = createServer(port, getUsers);

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
  return server;
};