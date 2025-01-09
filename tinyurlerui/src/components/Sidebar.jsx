import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // 用于页面跳转

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const setFalse = () => {
    setShowMenu(false);
  };

  const handleLogout = () => {
    // 清除本地存储中的 JWT
    localStorage.removeItem("jwt");
    localStorage.removeItem("isGoogleLogin");
    // 跳转到登录页面
    navigate("/");
  };

  return (
    <nav
      className="d-flex flex-column col-md-3 col-lg-2 bg-light min-vh-100"
      style={{ position: "relative" }}
    >
      <div className="pt-3">
        <button
          className="btn btn-primary w-100 mb-3"
          onClick={toggleMenu}
          style={{ textAlign: "center" }}
        >
          Create Now
        </button>

        {showMenu && (
          <div
            className="position-absolute bg-light shadow"
            style={{
              top: "16px", // 菜单距离顶部
              left: "108%", // 菜单位置在侧边栏的右边
              width: "200px",
              zIndex: "1050",
              borderRadius: "8px", // 四角圆润
              overflow: "visible",
            }}
          >
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink
                  to="/create-link"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Create Link
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/create-qrcode"
                  className="nav-link"
                  onClick={toggleMenu}
                >
                  Create QR Code
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link" onClick={setFalse}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/links" className="nav-link" onClick={setFalse}>
              Links
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/qrcodes" className="nav-link" onClick={setFalse}>
              QR Codes
            </NavLink>
          </li>
        </ul>
      </div>

      {/* 增加退出功能 */}
      <div
        className="mt-auto pb-3" // 使用 mt-auto 自动将内容推到底部
        style={{
          textAlign: "center",
        }}
      >
        <button
          className="btn btn-danger w-75" // 使用红色按钮表示退出
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
