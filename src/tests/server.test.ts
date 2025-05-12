import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { USERS_URL } from '../constants/constants';
import { users } from '../localDb/users';
import { createServer } from '../startProgram';
import { ResponseMessagesEnum, StatusCodesEnum } from '../types/enums';
import { IUser } from '../types/types';
import { User } from '../User/User';

const server = createServer(3000, () => users);

describe('Server should',() => {
  it('handle GET request to api/users correctly', async () => {
    const res = await request(server).get(USERS_URL).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.OK);
    expect(res.body).toEqual((users));
  });

  it('handle GET request to api/users/{userId} correctly', async () => {
    const userId = users[0].id;

    const res = await request(server).get(`${USERS_URL}/${userId}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.OK);
    expect(res.body).toEqual(users[0]);
  });

  it('handle GET request to api/users/{userId} with error if id is invalid', async () => {
    const res = await request(server).get(`${USERS_URL}/${123}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.BAD_REQUEST);
    expect(res.body).toEqual({message: ResponseMessagesEnum.INVALID_ID});
  });

  it('handle GET request to api/users/{userId} with error if user is not found', async () => {
    const fakeId = uuidv4();

    const res = await request(server).get(`${USERS_URL}/${fakeId}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.NOT_FOUND);
    expect(res.body).toEqual({message: ResponseMessagesEnum.USER_NOT_FOUND});
  });

  it('handle POST request api/users correctly', async() => {
    const body: IUser = new User({
      username: 'Test name',
      age: 22,
      hobbies: ['test']
    });

    const res = await request(server).post(USERS_URL).send(body).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.CREATED);
    expect(res.body.username).toBe(body.username);
  });

  it('handle POST request api/users with error if required fields are missed', async() => {
   const res = await request(server).post(USERS_URL).send({
      age: 22,
      hobbies: ['test']
    }).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.BAD_REQUEST);
    expect(res.body).toEqual({ message: ResponseMessagesEnum.INVALID_BODY});
  });

  it('handle PUT request api/users/{userId} correctly', async() => {
    const userId = users[0].id;
    const name = 'TestName';

    const res = await request(server).put(`${USERS_URL}/${userId}`).send({
       username: name,
       age: 22,
     }).set('Content-Type', 'application/json');
     expect(res.statusCode).toBe(StatusCodesEnum.OK);
     expect(res.body.username).toBe(name);
   });

   it('handle PUT request api/users/{userId} with error if id is invalid', async() => {
    const name = 'TestName';

    const res = await request(server).get(`${USERS_URL}/${123}`).send({
      username: name,
      age: 22,
    }).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.BAD_REQUEST);
    expect(res.body).toEqual({message: ResponseMessagesEnum.INVALID_ID});
   });

   it('handle PUT request api/users/{userId} with error if user does not exist', async() => {
    const fakeId = uuidv4();
    const name = 'TestName';

    const res = await request(server).put(`${USERS_URL}/${fakeId}`).send({
      username: name,
      age: 22,
    }).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.NOT_FOUND);
    expect(res.body).toEqual({message: ResponseMessagesEnum.USER_NOT_FOUND});
  });

  it('handle DELETE request api/users/{userId} correctly', async() => {
    const userId = users[0].id;

    const res = await request(server).delete(`${USERS_URL}/${userId}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.NO_CONTENT);
    expect(res.body).toBe('');
  });

  it('handle DELETE request api/users/{userId} with error if id is invalid', async() => {
    const res = await request(server).delete(`${USERS_URL}/${123}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.BAD_REQUEST);
    expect(res.body).toEqual({message: ResponseMessagesEnum.INVALID_ID});
  });

  it('handle DELETE request api/users/{userId} with error if user does not exist', async() => {
    const fakeId = uuidv4();

    const res = await request(server).delete(`${USERS_URL}/${fakeId}`).set('Content-Type', 'application/json');
    expect(res.statusCode).toBe(StatusCodesEnum.NOT_FOUND);
    expect(res.body).toEqual({message: ResponseMessagesEnum.USER_NOT_FOUND});
  });
} );