import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // 将默认开发服务器端口改为 3000
    host: "0.0.0.0", // 允许外部访问（在 Docker 中必需）
  },
  plugins: [react()],
});
