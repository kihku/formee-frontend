import { Box } from "@mui/material";
import CustomSnackBar from "components/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "utils/cookieUtils";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useEffect } from "react";

const LayoutCommon = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const TOKEN = getCookie("USER_TOKEN");
    if (window.location.pathname !== "/login" && TOKEN) {
      try {
        const payload: { exp: number } = await jwt_decode(TOKEN);
        const nowDate = moment(new Date());
        const expDate = moment(new Date(payload.exp * 1000));
        if (moment(nowDate).isAfter(expDate)) {
          setCookie("USER_TOKEN", "");
          navigate("/login");
        }
      } catch (error) {
        setCookie("USER_TOKEN", "");
        navigate("/login");
      }
    } else {
      setCookie("USER_TOKEN", "");
      navigate("/login");
    }
  }

  return (
    <Box>
      <CustomSnackBar />
    </Box>
  );
};

export default LayoutCommon;
