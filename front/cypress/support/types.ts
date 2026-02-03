export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  createdAt?: string;
  updatedAt?: string;
}