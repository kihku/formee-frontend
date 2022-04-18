import { Avatar } from "@mui/material";

interface CustomAvatarProps {
    image?: string;
    
  }
  export const CustomAvatar = ({image}: CustomAvatarProps) => {
      return(
          <Avatar src={image}  imgProps={{referrerPolicy:"no-referrer"}}/>
              
         
      );
  }