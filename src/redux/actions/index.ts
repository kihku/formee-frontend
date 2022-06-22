// export const updateAvatar = (imageUrl: string) => {
//   return { type: "SET", payload: { image: imageUrl } };
// };

export const updateUserInfo = (name: string, imageUrl: string) => {
  return { type: "SET", payload: { name: name, image: imageUrl } };
};
