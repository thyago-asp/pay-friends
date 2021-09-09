export interface IClient {
  accessToken: string;
  user: User;
}

export interface User{
  id: string,
  age: string,
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  token: string
}
