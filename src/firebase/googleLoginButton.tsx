import { IconButton } from "@mui/material";
import { UserService } from "apis/userService/userService";
import { CustomIcon } from "components/CustomIcon";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openNotification } from "redux/actions/notification";
import { COLORS } from "styles";
import { setCookie } from "utils/cookieUtils";

// const axios = require("axios").default;
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDD3tHhoMp11ShrhXjNH2KJ1ysudzVcmwk",
  authDomain: "formee-c27c5.firebaseapp.com",
  projectId: "formee-c27c5",
  storageBucket: "formee-c27c5.appspot.com",
  messagingSenderId: "27783212010",
  appId: "1:27783212010:web:47a588185bfc51c59ba093",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export interface GoogleLoginButtonProps {
  openUserGuide: boolean;
}

export const GoogleLoginButton = ({ openUserGuide }: GoogleLoginButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <IconButton
      sx={{ marginRight: "10px", color: COLORS.primary, border: "1px solid " + COLORS.lightText }}
      onClick={() => {
        signInWithPopup(auth, provider)
          .then(result => {
            result.user.getIdToken(true).then(idToken => {
              setCookie("USER_TOKEN", idToken);
              setCookie("USER_ID", result.user.uid);
              new UserService()
                .login(idToken)
                .then(response => {
                  localStorage.setItem(
                    "USER_DATA",
                    JSON.stringify({
                      uuid: response.uuid,
                      username: response.username,
                      email: response.email,
                      fullName: response.fullName,
                      phone: response.phone,
                      profilePicture: response.profilePicture,
                    }),
                  );
                  navigate(openUserGuide ? "/onboarding" : "/home");
                })
                .catch(e => {
                  dispatch(openNotification({ open: true, content: e.message, severity: "error" }));
                });
            });
          })
          .catch(error => {
            console.log(error);
          });
      }}
    >
      <CustomIcon name="google" size={20} />
    </IconButton>
  );
};
