import { Fade } from "@mui/material";
import { Layout } from "components/Layout";
import LoginPage from "pages/login";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTES } from "routes/routes";
import "./App.css";

function App() {
  return (
    <Suspense fallback={null}>
      <Fade in>
        <div className="base-layout">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {PUBLIC_ROUTES.map((page, key) => {
              return (
                <Route key={key} path={page.path} element={<Layout title={page.title}>{page.component}</Layout>} />
              );
            })}
          </Routes>
        </div>
      </Fade>
    </Suspense>
  );
}

export default App;
