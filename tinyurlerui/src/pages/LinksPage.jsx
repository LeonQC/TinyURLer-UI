import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./card.css";
import { FaTrash } from "react-icons/fa"; // 使用 Font Awesome 的删除图标

const LinksPage = () => {
  const [links, setLinks] = useState([]); // 存储从后端获取的数据
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const itemsPerPage = 5; // 每页显示的项目数
  const navigate = useNavigate();

  // 跳转到创建链接页面
  const handleCreateLink = () => {
    navigate("/create-link");
  };

  // 加载链接数据
  useEffect(() => {
    const fetchLinks = async () => {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) {
        alert("Please log in to access links.");
        navigate("/");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/urls", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("API Response:", response.data);
        setLinks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 401) {
          alert("Unauthorized access. Please log in again.");
          navigate("/");
        } else {
          setError("Failed to fetch links. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchLinks();
  }, [navigate]);

  // 删除链接
  const handleDelete = async (shortUrl) => {
    /**
     * shortUrl 示例: "http://localhost:8080/api/urls/abc123"
     * 使用 `split("/")` 提取最后一部分，即 `abc123`，作为 `shortUrlId`
     */
    const shortUrlId = shortUrl.split("/").pop(); // 提取短链接 ID
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      alert("Please log in to perform this action.");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/urls/${shortUrlId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // 删除成功后更新前端状态
      setLinks((prevLinks) =>
        prevLinks.filter((link) => link.shortUrl !== shortUrl)
      );
      alert("Link deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete the link. Please try again.");
    }
  };

  // 分页功能
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(links.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // 计算当前页的数据
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = links.slice(startIndex, startIndex + itemsPerPage);

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
      {currentItems.length > 0 ? (
        currentItems.map((link, index) => (
          <LinkCard
            key={index}
            title={link.title}
            shortUrl={link.shortUrl}
            longUrl={link.longUrl}
            onDelete={handleDelete} // 传递删除事件
          />
        ))
      ) : (
        <div className="text-muted">No links found.</div>
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
          Page {currentPage} of {Math.ceil(links.length / itemsPerPage)}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(links.length / itemsPerPage)} // 禁用下一页按钮
        >
          Next
        </button>
      </div>
    </div>
  );
};

const LinkCard = ({ title, shortUrl, longUrl, onDelete }) => {
  return (
    <div className="card mb-3 bg-light position-relative">
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
      {/* 删除按钮 */}
      <button
        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
        title="Delete"
        onClick={() => onDelete(shortUrl)} // 传递删除事件
      >
        <FaTrash />
      </button>
    </div>
  );
};

LinkCard.propTypes = {
  title: PropTypes.string.isRequired,
  shortUrl: PropTypes.string.isRequired,
  longUrl: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired, // 新增 onDelete 回调
};

export default LinksPage;
