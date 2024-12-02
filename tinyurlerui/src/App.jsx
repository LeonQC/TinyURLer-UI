import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import LinksPage from "./pages/LinksPage";
import QRCodePage from "./pages/QRCodePage";
import CreateLinkPage from "./pages/CreateLinkPage";
import CreateQRCodePage from "./pages/CreateQRCodePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/links" element={<LinksPage />} />
        <Route path="/qrcodes" element={<QRCodePage />} />
        <Route path="/create-link" element={<CreateLinkPage />} />
        <Route path="/create-qrcode" element={<CreateQRCodePage />} />
      </Route>
    </Routes>
  );
}

export default App;
