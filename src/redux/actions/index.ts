// export const updateAvatar = (imageUrl: string) => {
//   return { type: "SET", payload: { image: imageUrl } };
// };

import { UserDTO } from "models/user";

export const updateUserInfo = (user: UserDTO) => {
  return { type: "SET", payload: { ...user } };
};
