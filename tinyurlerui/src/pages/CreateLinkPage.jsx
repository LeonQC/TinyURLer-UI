import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateLinkPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 存储用户输入的标题
  const [longUrl, setLongUrl] = useState(""); // 存储用户输入的长链接
  const [error, setError] = useState(null); // 错误消息状态

  const handleCancel = () => {
    navigate("/links");
  };

  const handleCreate = async () => {
    if (!title || !longUrl) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      // 调用后端 API
      const response = await axios.post("http://localhost:8080/api/urls", {
        title,
        longUrl,
      });

      console.log("API Response:", response.data);

      // 创建成功后跳转到 Links 页面
      alert("QR Code Created!");
      navigate("/links");
    } catch (err) {
      console.error("Error creating link:", err);
      setError("Failed to create the link. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a Link</h2>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 更新标题状态
          />
        </div>
        <div className="mb-3">
          <label htmlFor="longUrl" className="form-label">
            Long URL
          </label>
          <input
            type="url"
            className="form-control"
            id="longUrl"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)} // 更新长链接状态
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
