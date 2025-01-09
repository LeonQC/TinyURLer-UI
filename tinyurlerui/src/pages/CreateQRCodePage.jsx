import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateQRCodePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(""); // 存储用户输入的标题
  const [longUrl, setLongUrl] = useState(""); // 存储用户输入的长链接
  const [error, setError] = useState(null); // 错误消息状态
  const [loading, setLoading] = useState(false); // 爬取状态

  const handleCancel = () => {
    navigate("/qrcodes");
  };

  const handleUrlBlur = async () => {
    if (!longUrl) return;

    try {
      setLoading(true);
      setError(null);

      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        alert("Unauthorized. Please log in.");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/api/crawl/title",
        { url: longUrl },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      setTitle(response.data);
    } catch (err) {
      console.error("Error fetching title:", err);
      setError("Failed to fetch title. Please try again.");
    } finally {
      setLoading(false);
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
        "http://localhost:8080/api/qrcode",
        { title, longUrl },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log("API Response:", response.data);

      alert("QR Code Created!");
      navigate("/qrcodes");
    } catch (err) {
      console.error("Error creating QR code:", err);
      if (err.response && err.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        navigate("/");
      } else {
        setError("Failed to create the QR code. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a QR Code</h2>
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
            onChange={(e) => setLongUrl(e.target.value)}
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
            value={loading ? "Fetching title..." : title}
            onChange={(e) => setTitle(e.target.value)}
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

export default CreateQRCodePage;
