import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateLinkPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 存储用户输入的标题
  const [longUrl, setLongUrl] = useState(""); // 存储用户输入的长链接
  const [error, setError] = useState(null); // 错误消息状态
  const [loading, setLoading] = useState(false); // 爬取状态

  const handleCancel = () => {
    navigate("/links");
  };

  const handleUrlBlur = async () => {
    if (!longUrl) return; // 如果 URL 为空，不调用 API

    try {
      setLoading(true); // 显示加载状态
      setError(null); // 清空错误消息

      const jwt = localStorage.getItem("jwt"); // 获取 JWT
      if (!jwt) {
        alert("Unauthorized. Please log in.");
        navigate("/");
        return;
      }

      // 调用后端 API 爬取标题
      const response = await axios.post(
        "http://localhost:8080/api/crawl/title",
        { url: longUrl },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // 将标题填入 Title 输入框
      setTitle(response.data);
    } catch (err) {
      console.error("Error fetching title:", err);
      setError("Failed to fetch title. Please try again.");
    } finally {
      setLoading(false); // 结束加载状态
    }
  };

  const handleCreate = async () => {
    if (!title || !longUrl) {
      setError("Please fill in both fields.");
      return;
    }

    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Unauthorized. Please log in.");
      navigate("/");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/urls",
        { title, longUrl },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("API Response:", response.data);

      alert("Link Created!");
      navigate("/links");
    } catch (err) {
      console.error("Error creating link:", err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        navigate("/");
      } else {
        setError("Failed to create the link. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Link</h2>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="longUrl" className="form-label">
            URL
          </label>
          <input
            type="url"
            className="form-control"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)} // 更新长链接状态
            onBlur={handleUrlBlur} // 失去焦点时调用爬取标题
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={loading ? "Fetching title..." : title} // 显示加载状态或标题
            onChange={(e) => setTitle(e.target.value)} // 用户可以手动修改标题
          />
        </div>
        <div className="d-flex justify-content-between mt-5">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLinkPage;
