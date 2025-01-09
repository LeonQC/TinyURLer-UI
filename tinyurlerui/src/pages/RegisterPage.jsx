import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 添加加载状态

  const handleRegister = async () => {
    // 校验邮箱和密码是否为空
    if (!email.trim()) {
      alert("Email is required.");
      return;
    }
    if (!password.trim()) {
      alert("Password is required.");
      return;
    }

    setIsLoading(true); // 开始加载
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
      });
      alert("Verification code sent to your email.");
      setIsLoading(false); // 停止加载
      // 跳转到验证码输入页面并传递 email
      navigate("/verify", { state: { email } });
    } catch (error) {
      console.error("Registration failed:", error);
      setIsLoading(false); // 停止加载
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center">Create Your Account</h2>
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
              disabled={isLoading} // 禁用输入框
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
              disabled={isLoading} // 禁用输入框
            />
          </div>
          <button
            type="button"
            onClick={handleRegister}
            className="btn btn-success w-100 mb-3"
            disabled={isLoading} // 禁用按钮
          >
            {isLoading ? "Sending Email..." : "Register"}{" "}
            {/* 根据加载状态显示提示 */}
          </button>
        </form>
        {isLoading && (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Processing your registration...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
