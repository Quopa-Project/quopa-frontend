export interface UserDto {
  id: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
  tokenVersion: number;
  accountVerified: boolean;
}
