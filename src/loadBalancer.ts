import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import http, { request, RequestOptions } from 'http';
import 'dotenv/config';
import { pipeline } from 'stream';

import { startProgram } from './startProgram';
import { sendResponse } from './utils/sendResponse';
import { ResponseMessagesEnum, StatusCodesEnum } from './types/enums';
import { IUser } from './types/types';
import { User } from './User/User';

const PORT = process.env.PORT;
const users: Array<IUser> = [];
users.push(new User({ username: 'Waria', age: 45, hobbies: [] }));

const createLoadBalancer = (port: number, workersAmount: number) => {
  let workerIndex = 1;

  const server = http.createServer((serverReq, serverRes) => {
    if (!cluster.workers) {
      return;
    }
    console.log(workerIndex);
    const targetPort = port + workerIndex;

    const options: RequestOptions = {
      hostname: 'localhost',
      path: serverReq.url,
      port: targetPort,
      method: serverReq.method,
      headers: serverReq.headers
    };

    const proxy = request(options, (proxyRes) => {
      serverRes.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
      pipeline(proxyRes, serverRes, (err) => {
        if (err) {
          sendResponse({
            code: StatusCodesEnum.INTERNAL_SERVER_ERROR,
            data: { message: `${ResponseMessagesEnum.SERVER_ERROR} ${err.message}` },
            res: serverRes
          });
        }
      });
    });
    pipeline(serverReq, proxy, (err) => {
      if (err) {
        sendResponse({
          code: StatusCodesEnum.INTERNAL_SERVER_ERROR,
          data: { message: `${ResponseMessagesEnum.SERVER_ERROR} ${err.message}` },
          res: serverRes
        });
      }
    });

    serverReq.on('error', (err) => {
      sendResponse({
        code: StatusCodesEnum.INTERNAL_SERVER_ERROR,
        data: { message: `${ResponseMessagesEnum.SERVER_ERROR} ${err.message}` },
        res: serverRes
      });
    });

    workerIndex = workerIndex < workersAmount - 1 ? workerIndex + 1 : 1;
  });

  server.listen(PORT, () => {
    console.log(`Load balancer listening on http://localhost:${PORT}/api`);
  });
};

const startLoadBalancer = () => {
  const cpusAmount = cpus().length;

  if(!PORT) {
    console.error('Please create env file with PORT.');
    process.exit(1);
  }

  if (cluster.isPrimary  ) {

    for (let i = 1; i < cpusAmount; i++) {
      cluster.fork({
        WORKER_PORT: (Number(PORT) + i).toString()
      });

      // TODO: figure out how to share data between cluster workers
      // worker.on('message', () => {
  
      // });
    }

    createLoadBalancer(Number(PORT), cpusAmount);

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died ${signal} ${code}`);
      cluster.fork();
    });
  } else {
    const workerPort = Number(process.env.WORKER_PORT);

    if (!workerPort) {
      console.error('WORKER_PORT environment variable is not set.');
      process.exit(1);
    }
    // TODO: finish task about shared data
    // process.on('message', (message: { type: string; message: IUser[]}) => {
    //   if(message.type === 'USERS_UPDATE') {
    //     localUsers = [...message.message];
    //   }
    // });

    // process.send?.({type: 'GET_USERS'});

    startProgram(workerPort, () => users);

  }
};

startLoadBalancer();
