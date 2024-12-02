import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div
      className="container-fluid"
      style={{ position: "relative", overflow: "visible" }}
    >
      <div className="row">
        {/* 侧边栏 */}
        <Sidebar style={{ zIndex: 2000 }} />

        {/* 主内容区域 */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet /> {/* 渲染子路由页面内容 */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
