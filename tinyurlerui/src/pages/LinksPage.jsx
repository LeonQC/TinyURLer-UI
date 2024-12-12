import PropTypes from "prop-types";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LinkCard = ({ title, shortUrl, longUrl }) => {
  return (
    <div className="card mb-3 bg-light ">
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
  );
};
LinkCard.propTypes = {
  title: PropTypes.string.isRequired, // title 是必需的字符串
  shortUrl: PropTypes.string.isRequired, // shortUrl 是必需的字符串
  longUrl: PropTypes.string.isRequired, // longUrl 是必需的字符串
};

const LinksPage = () => {
  const [links, setLinks] = useState([]); // 用于存储从后端获取的数据
  const [loading, setLoading] = useState(true); // 用于显示加载状态
  const [error, setError] = useState(null); //
  const navigate = useNavigate();

  const handleCreateLink = () => {
    navigate("/create-link");
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/urls"); // 发起 GET 请求获取所有链接
        console.log("API Response:", response.data);
        setLinks(response.data); // 设置获取到的链接数据
        setLoading(false); // 关闭加载状态
      } catch (err) {
        console.error(err);
        setError("Failed to fetch links. Please try again later.");
        setLoading(false); // 即使失败也关闭加载状态
      }
    };

    fetchLinks();
  }, []); // 空依赖数组表示仅在组件加载时运行

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Links</h2>
        <button className="btn btn-primary" onClick={handleCreateLink}>
          Create Link
        </button>
      </div>
      {links.length > 0 ? (
        links.map((link, index) => (
          <LinkCard
            key={index}
            title={link.title}
            shortUrl={link.shortUrl}
            longUrl={link.longUrl}
          />
        ))
      ) : (
        <div className="text-muted">No links found.</div>
      )}
    </div>
  );
};

export default LinksPage;
