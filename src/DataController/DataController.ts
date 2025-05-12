import { IFailedResponse, ISuccessResponse, IUser } from '../types/types';
import { ResponseMessagesEnum, StatusCodesEnum } from '../types/enums';
import { User } from '../User/User';

export class DataController {
  public users: Array<IUser>;

  constructor(users: Array<IUser>) {
    this.users = users;
  }

  findUserById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  async getAllUsers(): Promise<ISuccessResponse<Array<IUser>>> {
    const result: ISuccessResponse<Array<IUser>> = {
      code: StatusCodesEnum.OK,
      data: this.users,
    };
    return result;
  }

  getUserById(id: string): Promise<ISuccessResponse<IUser>> {
    return new Promise((resolve, reject) => {
      const user = this.findUserById(id);
      if (user) {
        const result: ISuccessResponse<IUser> = {
          code: StatusCodesEnum.OK,
          data: user,
        };
        resolve(result);
      } else {
        const error: IFailedResponse = {
          code: StatusCodesEnum.NOT_FOUND,
          message: ResponseMessagesEnum.USER_NOT_FOUND,
        };
        reject(error);
      }
    });
  }

  addUser(body: Omit<User, 'id'>): Promise<ISuccessResponse<IUser>> {
    return new Promise((resolve, reject) => {
      const { age, username, hobbies } = body;
      if (age && username && hobbies) {
        const newUser = new User({ age, username, hobbies });
        this.users.push(newUser);

        const result: ISuccessResponse<IUser> = {
          code: StatusCodesEnum.CREATED,
          data: newUser,
        };
        resolve(result);
      } else {
        const error: IFailedResponse = {
          code: StatusCodesEnum.BAD_REQUEST,
          message: ResponseMessagesEnum.INVALID_BODY,
        };
        reject(error);
      }
    });
  }

  updateUser(
    id: string,
    body: Omit<User, 'id'>,
  ): Promise<ISuccessResponse<IUser>> {
    return new Promise((resolve, reject) => {
      const user = this.findUserById(id);
      if (user) {
        const index = this.users.findIndex((user) => user.id === id);
        const updatedUser = { ...user, ...body };
        this.users[index] = updatedUser;

        const result: ISuccessResponse<IUser> = {
          code: StatusCodesEnum.CREATED,
          data: updatedUser,
        };
        resolve(result);
      } else {
        const error: IFailedResponse = {
          code: StatusCodesEnum.NOT_FOUND,
          message: ResponseMessagesEnum.USER_NOT_FOUND,
        };
        reject(error);
      }
    });
  }

  deleteUser(id: string): Promise<ISuccessResponse<{ message: string }>> {
    return new Promise((resolve, reject) => {
      const user = this.findUserById(id);

      if (user) {
        this.users = this.users.filter((user) => user.id !== id);
        const result: ISuccessResponse<{ message: string }> = {
          code: StatusCodesEnum.NO_CONTENT,
          data: { message: ResponseMessagesEnum.DELETED },
        };
        resolve(result);
      } else {
        const error: IFailedResponse = {
          code: StatusCodesEnum.NOT_FOUND,
          message: ResponseMessagesEnum.USER_NOT_FOUND,
        };
        reject(error);
      }
    });
  }
}
