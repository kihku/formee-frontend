import { Layout } from "components/Layout";
import ComponentsPage from "pages/components";
import LoginPage from "pages/login";
import SettingsPage from "pages/settings";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
