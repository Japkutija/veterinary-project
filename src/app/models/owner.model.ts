export interface Owner {
  uuid: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  emso?: string;
  dateOfBirth: Date;
}
