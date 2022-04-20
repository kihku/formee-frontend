export interface UserDTO {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: number;
  phoneNumber: string;
  email: string;
  birthDate: string;
  password: string;
}

export const initDataUser: UserDTO = {
  firstName: "",
  lastName: "",
  birthDate: "",
  phoneNumber: "",
  email: "",
  password: "",
} as UserDTO;
