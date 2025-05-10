import { IncomingMessage, ServerResponse } from 'http';
import { StatusCodesEnum } from './enums';

export interface IFindRouteProps {
  method: string;
  pathname: string;
  req: IncomingMessage;
  res: ServerResponse;
}

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
}

export interface ISendResponseProps<T> {
  code: number;
  data: T;
  res: ServerResponse<IncomingMessage>;
}

export interface ISuccessResponse<T> {
  code: StatusCodesEnum;
  message?: string;
  data: T;
}

export interface IFailedResponse {
  code: StatusCodesEnum;
  message: string;
}
