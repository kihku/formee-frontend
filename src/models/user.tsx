export interface UserDTO {
  uuid: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  profilePicture: string;
}

export const initDataUser: UserDTO = {
  fullName: "",
  phone: "",
  email: "",
  profilePicture: "",
} as UserDTO;
