import { User } from '../User/User';
import { IUser } from '../types/types';

export const users: Array<IUser> = [];
users.push(new User({ username: 'Waria', age: 45, hobbies: [] }));