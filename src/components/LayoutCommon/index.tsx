import { Box } from "@mui/material";
import CustomSnackBar from "components/CustomSnackbar";
import { getAuth } from "firebase/auth";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "utils/cookieUtils";

const LayoutCommon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  const logOut = () => {
    setCookie("USER_ID", "");
    setCookie("USER_TOKEN", "");
    localStorage.setItem("USER_DATA", "{}");
    getAuth().signOut(); // firebase
    navigate("/login");
  };

  const checkToken = async () => {
    const TOKEN = getCookie("USER_TOKEN");
    if (window.location.pathname !== "/login" && TOKEN) {
      try {
        const payload: { exp: number } = await jwt_decode(TOKEN);
        const nowDate = moment(new Date());
        const expDate = moment(new Date(payload.exp * 1000));
        if (moment(nowDate).isAfter(expDate)) {
          console.log("refreshing token");
          getAuth()
            .currentUser?.getIdToken(true)
            .then(token => {
              setCookie("USER_TOKEN", token);
            });
        }
      } catch (error) {
        logOut();
      }
    } else {
      logOut();
    }
  };

  return (
    <Box>
      <CustomSnackBar />
    </Box>
  );
};

export default LayoutCommon;
