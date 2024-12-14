export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}
