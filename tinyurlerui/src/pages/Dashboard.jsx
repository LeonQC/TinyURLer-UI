import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJwtFromSession = async () => {
      try {
        // 检查是否是 Google 登录
        const isGoogleLogin = localStorage.getItem("isGoogleLogin");
        console.log("Is Google Login:", isGoogleLogin);

        if (isGoogleLogin === "true") {
          const response = await axios.get(
            "http://localhost:8080/api/auth/token",
            { withCredentials: true } // 允许携带会话 cookie
          );
          const jwt = response.data;
          localStorage.setItem("jwt", jwt); // 存储 JWT
        }
      } catch (error) {
        console.error("Failed to fetch JWT from session", error);
        alert("Failed to retrieve user. Please log in again.");
        navigate("/login"); // 如果无法获取 JWT，则重定向到登录页面
      }
    };

    fetchJwtFromSession();
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Connections Platform</h2>
      <div className="row">
        {/* Links Card */}
        <div className="col-md-6">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Make it short</h5>
              <p className="card-text">
                Create and manage your short links effortlessly.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/links")}
              >
                Go to Links
              </button>
            </div>
          </div>
        </div>
        {/* QR Codes Card */}
        <div className="col-md-6">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Make it scannable</h5>
              <p className="card-text">
                Generate QR codes for your links and share them easily.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/qrcodes")}
              >
                Go to Codes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
