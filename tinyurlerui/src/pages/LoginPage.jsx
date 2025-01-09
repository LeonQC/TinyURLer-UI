import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // 保存用户输入的 email
  const [password, setPassword] = useState(""); // 保存用户输入的密码

  // Google 登录逻辑
  const handleGoogleLogin = () => {
    // 直接跳转到后端的 OAuth2 认证地址
    localStorage.setItem("isGoogleLogin", "true");
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  // 普通登录逻辑
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { email, password }
      );
      const jwt = response.data; // 获取后端返回的 JWT
      localStorage.setItem("jwt", jwt); // 存储 JWT
      navigate("/dashboard"); // 跳转到主页面
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  // 跳转到注册页面
  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center">Login to TinyURLer</h2>
        <button
          onClick={handleGoogleLogin}
          className="btn btn-primary w-100 my-3"
        >
          Continue with Google
        </button>
        <div className="text-center my-2">OR</div>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="btn btn-success w-100 mb-3"
          >
            Login
          </button>
        </form>
        <p className="text-center">
          Do not have an account?{" "}
          <span
            onClick={handleNavigateToRegister}
            className="text-primary text-decoration-underline"
            style={{ cursor: "pointer" }}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
