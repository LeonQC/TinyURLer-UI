import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const QRCodeCard = ({ qrCodeSrc, title, shortUrl, longUrl }) => {
  return (
    <div className="card mb-3">
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
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              <strong>Short URL:</strong> <a href={shortUrl}>{shortUrl}</a>
            </p>
            <p className="card-text">
              <strong>Long URL:</strong> <a href={longUrl}>{longUrl}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

QRCodeCard.propTypes = {
  qrCodeSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired, // title 是必需的字符串
  shortUrl: PropTypes.string.isRequired, // shortUrl 是必需的字符串
  longUrl: PropTypes.string.isRequired, // longUrl 是必需的字符串
};

const QRCodePage = () => {
  const [qrCodes, setQRCodes] = useState([]); // 存储从后端获取的二维码数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const navigate = useNavigate();

  const handleCreateQRCode = () => {
    navigate("/create-qrcode");
  };

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/qrcode");
        console.log("API Response:", response.data); // 调试输出
        setQRCodes(response.data); // 设置获取到的数据
        setLoading(false); // 关闭加载状态
      } catch (err) {
        console.error(err);
        setError("Failed to fetch QR codes. Please try again later.");
        setLoading(false); // 关闭加载状态
      }
    };

    fetchQRCodes();
  }, []); // 空依赖数组表示仅在组件加载时运行

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  // 出现错误时显示
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
      {qrCodes.map((qrCode, index) => (
        <QRCodeCard
          key={index}
          qrCodeSrc={`data:image/png;base64,${qrCode.qrCode}`}
          title={qrCode.title}
          shortUrl={qrCode.shortUrl}
          longUrl={qrCode.longUrl}
        />
      ))}
    </div>
  );
};

export default QRCodePage;
