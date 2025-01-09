import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
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

export default MainPage;
