import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//redux
import { updateAvatar } from "../redux/actions";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "utils/cookieUtils";
import { UserService } from "apis/userService/userService";
import { openNotification } from "redux/actions/notification";

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

export const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <IconButton
      sx={{ marginRight: "10px", color: COLORS.primary, border: "1px solid " + COLORS.lightText }}
      onClick={() => {
        signInWithPopup(auth, provider)
          .then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential !== null) {
              if (result.user.photoURL !== null) {
                dispatch(updateAvatar(result.user.photoURL));
              }
            }
            result.user.getIdToken(true).then(idToken => {
              setCookie("USER_TOKEN", idToken);
              setCookie("USER_ID", result.user.uid);
              new UserService()
                .login(idToken)
                .then(response => {
                  // console.log("token", getCookie("USER_TOKEN"));
                  // console.log("id", getCookie("USER_ID"));
                  navigate("/home");
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
      <CustomIcon name="google" size={25} />
    </IconButton>
  );
};
