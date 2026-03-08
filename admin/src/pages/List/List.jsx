import React, { useEffect, useState } from 'react'
import axios from "axios"
import { toast } from "react-toastify"

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);

  const fetchlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to load food items");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const remove_function = async (foodid) => {
    setRemoving(foodid);
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodid });
      await fetchlist();
      if (response.data.success) {
        toast.success("Food item removed");
      } else {
        toast.error("Failed to remove item");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setRemoving(null);
    }
  };

  useEffect(() => { fetchlist(); }, []);
  useEffect(() => {
    document.title = "Food List ";
  }, []);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Lato:wght@300;400;700&display=swap');

        .food-list-wrapper {
          font-family: 'Lato', sans-serif;
          background: linear-gradient(135deg, #fdf6f0 0%, #fef9f5 50%, #f5f0ff 100%);
          min-height: 100vh;
          padding: 40px 32px;
          color: #3d2e26;
          width: 100%;
          box-sizing: border-box;
        }

        .food-list-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }

        .food-list-header-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #ff8c61, #ff6b35);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          box-shadow: 0 8px 20px rgba(255, 107, 53, 0.28);
        }

        .food-list-title {
          font-family: 'Nunito', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #2d1f18;
          letter-spacing: -0.4px;
          margin: 0;
        }

        .food-list-subtitle {
          font-size: 13px;
          color: #a08878;
          margin: 3px 0 0;
          font-weight: 300;
        }

        .food-table-card {
          background: #ffffff;
          border-radius: 24px;
          border: 1px solid #f0e8e0;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(180, 120, 80, 0.1), 0 2px 8px rgba(0,0,0,0.04);
          width: 100%;
          box-sizing: border-box;
        }

        .food-table-head {
          display: grid;
          grid-template-columns: 72px 1fr 160px 120px 90px;
          align-items: center;
          padding: 16px 28px;
          background: linear-gradient(90deg, #fff8f4, #fdf4ff);
          border-bottom: 1px solid #f0e8e0;
          gap: 16px;
          width: 100%;
          box-sizing: border-box;
        }

        .food-table-head span {
          font-family: 'Nunito', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #c4a090;
        }

        .food-table-head span:last-child {
          text-align: center;
        }

        .food-table-row {
          display: grid;
          grid-template-columns: 72px 1fr 160px 120px 90px;
          align-items: center;
          padding: 14px 28px;
          gap: 16px;
          border-bottom: 1px solid #f8f0eb;
          transition: background 0.2s ease;
          animation: rowSlideIn 0.35s ease both;
          width: 100%;
          box-sizing: border-box;
        }

        .food-table-row:last-child {
          border-bottom: none;
        }

        .food-table-row:hover {
          background: #fff8f4;
        }

        @keyframes rowSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .food-img-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          overflow: hidden;
          border: 2px solid #f0e8e0;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }

        .food-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .food-name {
          font-size: 14px;
          font-weight: 600;
          color: #2d1f18;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .food-category-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          background: linear-gradient(135deg, #fff0e8, #f8f0ff);
          border: 1px solid #e8d8d0;
          border-radius: 20px;
          font-size: 12px;
          color: #b07060;
          font-weight: 600;
          white-space: nowrap;
        }

        .food-price {
          font-family: 'Nunito', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #ff6b35;
        }

        .remove-btn {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1.5px solid #ffd0c0;
          background: #fff5f0;
          color: #e05030;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: all 0.2s ease;
          font-size: 18px;
          line-height: 1;
        }

        .remove-btn:hover {
          background: #ff6b35;
          border-color: #ff6b35;
          color: #fff;
          transform: scale(1.1);
          box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
        }

        .remove-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .remove-btn.spinning {
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .food-empty {
          padding: 60px 24px;
          text-align: center;
        }

        .food-empty-icon {
          font-size: 44px;
          margin-bottom: 12px;
          opacity: 0.4;
        }

        .food-empty-text {
          color: #b09080;
          font-size: 14px;
        }

        .skeleton-row {
          display: grid;
          grid-template-columns: 72px 1fr 160px 120px 90px;
          align-items: center;
          padding: 14px 28px;
          gap: 16px;
          border-bottom: 1px solid #f8f0eb;
          width: 100%;
          box-sizing: border-box;
        }

        .skeleton {
          background: linear-gradient(90deg, #f5ede8 25%, #fdf5f0 50%, #f5ede8 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .food-count-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          background: #fff0e8;
          border: 1px solid #ffd8c0;
          border-radius: 20px;
          font-size: 12px;
          color: #e07848;
          font-weight: 700;
          margin-left: 10px;
          vertical-align: middle;
        }
      `}</style>

      <div className="food-list-wrapper">
        <div className="food-list-header">
          <div className="food-list-header-icon">🍽️</div>
          <div>
            <p className="food-list-title">
              Food Menu
              {!loading && <span className="food-count-pill">{list.length}</span>}
            </p>
            <p className="food-list-subtitle">Manage your restaurant's food catalog</p>
          </div>
        </div>

        <div className="food-table-card">
          <div className="food-table-head">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span>Action</span>
          </div>

          {loading ? (
            [1, 2, 3].map(i => (
              <div className="skeleton-row" key={i}>
                <div className="skeleton" style={{ width: 52, height: 52, borderRadius: 12 }} />
                <div className="skeleton" style={{ height: 14, width: '60%' }} />
                <div className="skeleton" style={{ height: 26, width: 80, borderRadius: 20 }} />
                <div className="skeleton" style={{ height: 14, width: 50 }} />
                <div className="skeleton" style={{ height: 34, width: 34, borderRadius: 10, margin: '0 auto' }} />
              </div>
            ))
          ) : list.length === 0 ? (
            <div className="food-empty">
              <div className="food-empty-icon">🍴</div>
              <p className="food-empty-text">No food items found. Add some dishes to get started.</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div
                key={item._id}
                className="food-table-row"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <div className="food-img-wrap">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                </div>
                <span className="food-name">{item.name}</span>
                <span>
                  <span className="food-category-badge">{item.category}</span>
                </span>
                <span className="food-price">${item.price}</span>
                <button
                  className={`remove-btn ${removing === item._id ? 'spinning' : ''}`}
                  onClick={() => remove_function(item._id)}
                  disabled={removing === item._id}
                  title="Remove item"
                  aria-label={`Remove ${item.name}`}
                >
                  {removing === item._id ? '↻' : '×'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default List;