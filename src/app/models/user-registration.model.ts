export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Using ISO string for dates.
  emso: string;
  phoneNumber: string;
  address: string;
}
