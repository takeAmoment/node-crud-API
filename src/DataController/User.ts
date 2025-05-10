import { v4 as uuidv4 } from 'uuid';

import { IUser } from '../types/types';

export class User implements IUser {
  public id: string;
  public username: string;
  public age: number;
  public hobbies: string[];

  constructor ({ username, age, hobbies }: Omit<IUser, 'id'>) {
    this.id = uuidv4();
    this.username = username;
    this.age = age;
    this.hobbies = hobbies;
  }
}