import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"
import { assets } from "../../assets/assets"

const statusConfig = {
  "Food Processing": {
    color: "#C2873A", bg: "#FEF6E9", border: "#F2D49B", dot: "#E6A83C",
  },
  "Out for Delivery": {
    color: "#2E6FD9", bg: "#EBF2FE", border: "#AECBFA", dot: "#3B82F6",
  },
  "Delivered": {
    color: "#1D7A4F", bg: "#E8F7F0", border: "#9ADBBF", dot: "#22C55E",
  }
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap');

  .ord-wrap {
    font-family: 'Nunito', sans-serif;
    padding: 24px 32px 32px;
    color: #1c1917;
    width: 100%;
    box-sizing: border-box;
  }

  /* Header */
  .ord-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .ord-title {
    font-size: 20px;
    font-weight: 800;
    color: #1c1917;
    letter-spacing: -0.3px;
    margin: 0;
  }

  .ord-badge {
    font-size: 12px;
    font-weight: 700;
    background: #1c1917;
    color: #fff;
    padding: 4px 14px;
    border-radius: 100px;
    letter-spacing: 0.3px;
  }

  /* Table */
  .ord-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
  }

  .ord-table thead tr th {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #a8a29e;
    padding: 0 14px 6px;
    text-align: left;
    white-space: nowrap;
  }

  .ord-table thead tr th:last-child {
    text-align: right;
  }

  .ord-table tbody tr {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    transition: box-shadow 0.18s, transform 0.18s;
    animation: rowIn 0.35s ease both;
  }

  @keyframes rowIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ord-table tbody tr:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.09);
    transform: translateY(-1px);
  }

  .ord-table tbody tr td {
    padding: 14px 14px;
    vertical-align: middle;
  }

  /* Round corners on row via first/last td */
  .ord-table tbody tr td:first-child {
    border-radius: 12px 0 0 12px;
  }
  .ord-table tbody tr td:last-child {
    border-radius: 0 12px 12px 0;
  }

  /* Icon cell */
  .ord-icon {
    width: 42px;
    height: 42px;
    background: #fef3c7;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .ord-icon img {
    width: 22px;
    height: 22px;
    object-fit: contain;
    opacity: 0.85;
  }

  /* Items */
  .ord-items {
    font-size: 13px;
    font-weight: 600;
    color: #1c1917;
    margin: 0 0 2px;
    white-space: nowrap;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ord-name {
    font-size: 12px;
    font-weight: 700;
    color: #57534e;
    margin: 0 0 1px;
  }

  .ord-addr {
    font-size: 11px;
    color: #a8a29e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 260px;
    margin: 0;
  }

  .ord-phone {
    font-size: 11px;
    color: #a8a29e;
    margin: 0;
  }

  /* Number cells */
  .ord-num {
    font-size: 16px;
    font-weight: 700;
    color: #1c1917;
    white-space: nowrap;
  }

  .ord-num-sub {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #c4bdb5;
    display: block;
  }

  /* Status select */
  .status-cell {
    text-align: right;
  }

  .status-wrap {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .status-dot {
    position: absolute;
    left: 10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--s-dot);
    pointer-events: none;
    animation: blink 2s infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.5; transform:scale(1.3); }
  }

  .status-select {
    appearance: none;
    -webkit-appearance: none;
    border: 1.5px solid var(--s-border);
    background: var(--s-bg);
    color: var(--s-color);
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 30px 8px 24px;
    border-radius: 9px;
    cursor: pointer;
    outline: none;
    transition: box-shadow 0.18s;
    letter-spacing: 0.2px;
    min-width: 158px;
  }

  .status-select:focus {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--s-border) 50%, transparent);
  }

  .status-chevron {
    position: absolute;
    right: 9px;
    pointer-events: none;
    color: var(--s-color);
    opacity: 0.65;
  }

  /* Empty & loading */
  .ord-empty {
    text-align: center;
    padding: 60px 20px;
    color: #a8a29e;
  }
  .ord-empty-icon { font-size: 40px; margin-bottom: 12px; opacity: 0.4; }
  .ord-empty-text { font-size: 14px; font-weight: 500; margin: 0; }

  @media (max-width: 780px) {
    .ord-wrap { padding: 16px; }
    .ord-table thead { display: none; }
    .ord-table tbody tr {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 14px;
      border-radius: 12px;
    }
    .ord-table tbody tr td {
      padding: 0;
      border-radius: 0 !important;
    }
    .status-cell { width: 100%; text-align: left; }
    .status-select { width: 100%; }
  }
`;

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllorder = async () => {
    try {
      const res = await axios.get(url + "/api/order/list");
      if (res.data.success) setOrders(res.data.data);
      else toast.error("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  const StatusHandler = async (e, orderId) => {
    const res = await axios.post(url + "/api/order/status", {
      orderId, status: e.target.value
    });
    if (res.data.success) fetchAllorder();
  };

  useEffect(() => { fetchAllorder(); }, []);
  useEffect(() => {
    document.title = "Track - Order";
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="ord-wrap">

        <div className="ord-head">
          <h1 className="ord-title">Live Orders</h1>
          <span className="ord-badge">{orders.length} orders</span>
        </div>

        {loading ? (
          <div className="ord-empty">
            <div className="ord-empty-icon">⏳</div>
            <p className="ord-empty-text">Loading orders…</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="ord-empty">
            <div className="ord-empty-icon">🍽️</div>
            <p className="ord-empty-text">No orders yet</p>
          </div>
        ) : (
          <table className="ord-table">
            <thead>
              <tr>
                <th></th>
                <th>Order Details</th>
                <th>Items</th>
                <th>Total</th>
                <th style={{textAlign:'right'}}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => {
                const status = order.status || "Food Processing";
                const cfg = statusConfig[status] || statusConfig["Food Processing"];

                return (
                  <tr key={i} style={{ animationDelay: `${i * 40}ms` }}>

                    {/* Icon */}
                    <td>
                      <div className="ord-icon">
                        <img src={assets.parcel_icon} alt="order" />
                      </div>
                    </td>

                    {/* Info */}
                    <td>
                      <p className="ord-items">
                        {order.items.map((item, idx) =>
                          idx === order.items.length - 1
                            ? `${item.name} × ${item.quantity}`
                            : `${item.name} × ${item.quantity}, `
                        )}
                      </p>
                      <p className="ord-name">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="ord-addr">
                        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} {order.address.zipcode}
                      </p>
                      <p className="ord-phone">{order.address.phone}</p>
                    </td>

                    {/* Item count */}
                    <td>
                      <span className="ord-num-sub">Items</span>
                      <span className="ord-num">{order.items.length}</span>
                    </td>

                    {/* Amount */}
                    <td>
                      <span className="ord-num-sub">Total</span>
                      <span className="ord-num">₹{order.amount}</span>
                    </td>

                    {/* Status */}
                    <td className="status-cell">
                      <div className="status-wrap" style={{
                        '--s-color': cfg.color,
                        '--s-bg': cfg.bg,
                        '--s-border': cfg.border,
                        '--s-dot': cfg.dot,
                      }}>
                        <span className="status-dot" />
                        <select
                          className="status-select"
                          value={status}
                          onChange={e => StatusHandler(e, order._id)}
                        >
                          <option value="Food Processing">Food Processing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <svg className="status-chevron" width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Order;