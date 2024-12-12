import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-danger-subtle">
      <div className="text-center">
        <h1>Welcom to TinyURLer</h1>
        <button className="btn btn-primary mt-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
