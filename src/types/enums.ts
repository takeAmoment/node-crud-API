export enum HttpMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum StatusCodesEnum {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CREATED = 201,
  NO_CONTENT = 204,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ResponseMessagesEnum {
  INVALID_ID = 'User id is invalid.',
  USER_NOT_FOUND = 'User is not found.',
  INVALID_BODY = 'Required fields are absent.',
  DELETED = 'User was deleted.',
  WRONG_URL = 'Such endpoint does not exist',
  SERVER_ERROR = 'Something went wrong.',
}
