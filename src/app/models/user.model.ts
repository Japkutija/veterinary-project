export interface User {
  uuid: string;
  role: 'USER' | 'ADMIN';
  firstName: string;
  lastName: string;
}
