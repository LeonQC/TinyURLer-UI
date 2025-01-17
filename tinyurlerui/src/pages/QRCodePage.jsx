import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // 使用 FontAwesome 图标
import "./card.css";

const QRCodeCard = ({ qrCodeSrc, title, shortUrl, longUrl, onDelete }) => {
  return (
    <div className="card mb-3 position-relative">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={qrCodeSrc}
            className="img-fluid rounded-start"
            alt="QR Code"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-truncate" title={title}>
              {title}
            </h5>
            <p className="card-text text-truncate" title={shortUrl}>
              <strong>Short URL:</strong> <a href={shortUrl}>{shortUrl}</a>
            </p>
            <p className="card-text text-truncate" title={longUrl}>
              <strong>Long URL:</strong> <a href={longUrl}>{longUrl}</a>
            </p>
          </div>
        </div>
      </div>
      {/* 删除图标 */}
      <button
        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
        onClick={() => onDelete(shortUrl)}
        title="Delete QR Code"
      >
        <FaTrash />
      </button>
    </div>
  );
};

QRCodeCard.propTypes = {
  qrCodeSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  longUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired, // 新增 onDelete 回调函数
};

const QRCodePage = () => {
  const [qrCodes, setQRCodes] = useState([]); // 存储从后端获取的数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const itemsPerPage = 4; // 每页显示的项目数
  const navigate = useNavigate();

  const handleCreateQRCode = () => {
    navigate("/create-qrcode");
  };

  useEffect(() => {
    const fetchQRCodes = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        alert("Please log in to access QR Codes.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/qrcode", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("API Response:", response.data);
        setQRCodes(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          alert("Unauthorized access. Please log in again.");
          navigate("/");
        } else {
          setError("Failed to fetch QR codes. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchQRCodes();
  }, [navigate]);

  const handleDelete = async (shortUrl) => {
    if (!window.confirm("Are you sure you want to delete this QR Code?")) {
      return;
    }

    const shortUrlId = shortUrl.split("/").pop(); // 获取 shortUrlId
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Please log in to delete QR Codes.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/urls/${shortUrlId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      alert("QR Code deleted successfully!");

      // 更新前端状态
      setQRCodes((prev) => prev.filter((code) => code.shortUrl !== shortUrl));
    } catch (err) {
      console.error("Failed to delete QR Code", err);
      alert("Failed to delete QR Code. Please try again.");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(qrCodes.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 计算当前页的数据
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = qrCodes.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>QR Codes</h2>
        <button className="btn btn-primary" onClick={handleCreateQRCode}>
          Create QR Code
        </button>
      </div>
      {currentItems.length > 0 ? (
        currentItems.map((qrCode, index) => (
          <QRCodeCard
            key={index}
            qrCodeSrc={`data:image/png;base64,${qrCode.qrCode}`}
            title={qrCode.title}
            shortUrl={qrCode.shortUrl}
            longUrl={qrCode.longUrl}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="text-muted">No QR codes found.</div>
      )}

      {/* 分页按钮 */}
      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1} // 禁用上一页按钮
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(qrCodes.length / itemsPerPage)}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(qrCodes.length / itemsPerPage)} // 禁用下一页按钮
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
