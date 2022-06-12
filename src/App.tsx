import { Backdrop, Fade } from "@mui/material";
import { Layout } from "components/Layout";
import LoginPage from "pages/login";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "routes/routes";
import PropagateLoader from "react-spinners/PropagateLoader";
import "./App.css";
import { COLORS } from "styles";
import "./i18n";
import GeneralErrorPage from "pages/generalError";
import OrderTrackingPage from "pages/tracking";
import LayoutCommon from "components/LayoutCommon";

export const CustomLoadingSpinner = () => {
  return (
    <Backdrop open>
      <PropagateLoader color={COLORS.background} />
    </Backdrop>
  );
};

function App() {
  return (
    <Suspense fallback={<CustomLoadingSpinner />}>
      <Fade in>
        <div className="base-layout">
          <LayoutCommon />
          <Routes>
            <Route path="/error" element={<GeneralErrorPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tracking/*" element={<OrderTrackingPage />} />
            {PUBLIC_ROUTES.map((page, key) => {
              return (
                <Route key={key} path={page.path} element={<Layout title={page.title}>{page.component}</Layout>} />
              );
            })}
            <Route path="*" element={<GeneralErrorPage />} />
          </Routes>
        </div>
      </Fade>
    </Suspense>
  );
}

export default App;
