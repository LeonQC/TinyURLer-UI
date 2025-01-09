import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; // 获取从注册页面传递的 email
  const [verificationCode, setVerificationCode] = useState("");
  const [isResendDisabled, setIsResendDisabled] = useState(true); // 控制 resend 按钮的状态
  const [timer, setTimer] = useState(60); // 倒计时
  const [isLoading, setIsLoading] = useState(false); // 显示加载提示

  useEffect(() => {
    // 启动倒计时
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsResendDisabled(false); // 解锁按钮
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // 清除定时器
  }, []);

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify",
        {
          email,
          token: verificationCode,
        }
      );
      const jwt = response.data; // 获取后端返回的 JWT
      localStorage.setItem("jwt", jwt); // 存储 JWT
      navigate("/dashboard"); // 跳转到主页面
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Invalid verification code. Please try again.");
    }
  };

  const handleResend = async () => {
    setIsLoading(true); // 开始加载
    try {
      await axios.post("http://localhost:8080/api/auth/resend", { email });
      alert("Verification code resent to your email.");
      setIsLoading(false); // 停止加载
      setIsResendDisabled(true); // 禁用按钮
      setTimer(60); // 重置倒计时

      // 重新启动倒计时
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Failed to resend verification code:", error);
      alert("Failed to resend verification code. Please try again.");
      setIsLoading(false); // 停止加载
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h2 className="text-center">Verify Your Account</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="verificationCode" className="form-label">
              Verification Code
            </label>
            <div className="input-group">
              <input
                type="text"
                id="verificationCode"
                className="form-control"
                placeholder="Enter the code sent to your email"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <button
                type="button"
                onClick={handleResend}
                className="btn btn-primary"
                disabled={isResendDisabled || isLoading} // 按钮禁用条件
              >
                {isLoading
                  ? "Sending..."
                  : `Resend ${isResendDisabled ? `(${timer}s)` : ""}`}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleVerify}
            className="btn btn-success w-100 mb-3"
          >
            Verify and Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyPage;
