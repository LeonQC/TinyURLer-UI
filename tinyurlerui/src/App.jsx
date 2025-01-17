import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import LinksPage from "./pages/LinksPage";
import QRCodePage from "./pages/QRCodePage";
import CreateLinkPage from "./pages/CreateLinkPage";
import CreateQRCodePage from "./pages/CreateQRCodePage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyPage />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/qrcodes" element={<QRCodePage />} />
        <Route path="/create-link" element={<CreateLinkPage />} />
        <Route path="/create-qrcode" element={<CreateQRCodePage />} />
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
