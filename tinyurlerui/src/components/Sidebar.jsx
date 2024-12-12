import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const setFalse = () => {
    setShowMenu(false);
  };

  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-light min-vh-100 nav">
      <div className="position-sticky pt-3">
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
              top: "16px", // 菜单距离顶部 10px
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
    </nav>
  );
};

export default Sidebar;
