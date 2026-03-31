export interface User {
  id: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  birthDate: Date;
}

export type Writer = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

export type UserComment = {
  firstName: string;
  lastName: string;
  username: string;
};
