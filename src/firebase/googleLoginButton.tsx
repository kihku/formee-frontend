import { CustomButton } from "components/CustomButton";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

//redux
import { updateAvatar } from "../redux/actions";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { CustomIcon } from "components/CustomIcon";
import { COLORS } from "styles";
import { useNavigate } from "react-router-dom";
import AXIOS_INSTANCE from "apis/baseService";
import { getCookie, setCookie } from "utils/cookieUtils";

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
              // const token = credential.accessToken;
              // console.log(token);
              // console.log(result.user.getIdToken());
              if (result.user.photoURL !== null) {
                dispatch(updateAvatar(result.user.photoURL));
              }
            }
            result.user
              .getIdToken(true)
              .then(idToken => {
                setCookie("USER_TOKEN", idToken);
                AXIOS_INSTANCE.post(
                  "http://localhost:8080/api/authentication/login",
                  {},
                  {
                    headers: {
                      token: idToken,
                      "Content-Type": "application/json",
                    },
                  },
                );
              })
              .then(response => {
                console.log("token", getCookie("USER_TOKEN"));
                navigate("/home");
              });
          })
          .catch(error => {
            console.log(error);
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // // ...
          });
      }}
    >
      <CustomIcon name="google" size={25} />
    </IconButton>
  );
};
