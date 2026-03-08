import React, { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Nunito:wght@300;400;500;600;700&display=swap');

  .add-wrap {
    font-family: 'Nunito', sans-serif;
    padding: 28px 36px 36px;
    max-width: 860px;
  }

  .add-page-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    font-weight: 700;
    color: #1c1917;
    margin: 0 0 4px;
  }

  .add-page-sub {
    font-size: 13px;
    color: #a8a29e;
    margin: 0 0 22px;
    font-weight: 400;
  }

  .add-panel {
    display: grid;
    grid-template-columns: 240px 1fr;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid #e7e4de;
    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
  }

  /* LEFT — image panel */
  .add-left {
    background: linear-gradient(160deg, #fef3c7 0%, #fde68a 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 36px 20px;
    position: relative;
    gap: 14px;
  }

  .add-left-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #92400e;
    opacity: 0.7;
  }

  .upload-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 3px dashed #f59e0b;
    background: rgba(255,255,255,0.45);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    overflow: hidden;
    position: relative;
  }

  .upload-circle:hover {
    background: rgba(255,255,255,0.65);
    border-color: #d97706;
    transform: scale(1.03);
  }

  .upload-circle label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .upload-circle img.preview {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .upload-circle-icon { font-size: 26px; line-height: 1; }

  .upload-circle-text {
    font-size: 11px;
    font-weight: 600;
    color: #92400e;
    text-align: center;
    padding: 0 14px;
    line-height: 1.4;
  }

  .upload-change-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.38);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.2s;
    font-size: 12px;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .upload-circle:hover .upload-change-overlay { opacity: 1; }

  .add-left-hint {
    font-size: 10.5px;
    color: #92400e;
    opacity: 0.55;
    text-align: center;
  }

  .add-left::before {
    content: '';
    position: absolute;
    top: 14px; right: 14px;
    width: 42px; height: 42px;
    border-radius: 50%;
    background: rgba(245,158,11,0.18);
  }
  .add-left::after {
    content: '';
    position: absolute;
    bottom: 18px; left: 14px;
    width: 24px; height: 24px;
    border-radius: 50%;
    background: rgba(245,158,11,0.13);
  }

  /* RIGHT — form panel */
  .add-right {
    background: #ffffff;
    padding: 28px 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .f-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .f-label {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c4bdb5;
  }

  .f-input {
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #1c1917;
    background: #fafaf9;
    border: 1.5px solid #ece8e1;
    border-radius: 10px;
    padding: 10px 13px;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
    box-sizing: border-box;
    width: 100%;
    resize: none;
  }

  .f-input::placeholder { color: #d6d0c8; font-weight: 400; }

  .f-input:focus {
    border-color: #f59e0b;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(245,158,11,0.11);
  }

  textarea.f-input { line-height: 1.55; }

  /* Category pills */
  .cat-wrap { display: flex; flex-wrap: wrap; gap: 6px; }

  .cat-pill {
    padding: 5px 12px;
    border-radius: 8px;
    border: 1.5px solid #ece8e1;
    background: #fafaf9;
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #a8a29e;
    cursor: pointer;
    transition: all 0.15s;
  }

  .cat-pill:hover { border-color: #fcd34d; color: #92400e; background: #fffbeb; }
  .cat-pill.on { background: #f59e0b; border-color: #f59e0b; color: #fff; }

  /* Bottom row: price + buttons */
  .bottom-row {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 14px;
    align-items: flex-end;
    margin-top: 2px;
  }

  .price-wrap { position: relative; }
  .price-sym {
    position: absolute;
    left: 13px; top: 50%;
    transform: translateY(-50%);
    font-size: 14px; font-weight: 700; color: #c4bdb5;
    pointer-events: none;
  }
  .price-wrap .f-input { padding-left: 27px; }

  .btn-row { display: flex; gap: 10px; }

  .btn-submit {
    flex: 1;
    padding: 11px 16px;
    background: #f59e0b;
    border: none;
    border-radius: 11px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    transition: background 0.18s, transform 0.14s, box-shadow 0.18s;
    letter-spacing: 0.2px;
  }

  .btn-submit:hover {
    background: #d97706;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(245,158,11,0.3);
  }

  .btn-submit:disabled { opacity: 0.5; pointer-events: none; }

  .btn-reset {
    padding: 11px 15px;
    background: transparent;
    border: 1.5px solid #ece8e1;
    border-radius: 11px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #a8a29e;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-reset:hover { border-color: #c4bdb5; color: #78716c; }

  @media (max-width: 620px) {
    .add-wrap { padding: 16px; }
    .add-panel { grid-template-columns: 1fr; }
    .add-left { flex-direction: row; padding: 22px 20px; justify-content: flex-start; gap: 18px; }
    .upload-circle { width: 90px; height: 90px; flex-shrink: 0; }
    .bottom-row { grid-template-columns: 1fr; }
  }
`;

const CATS = ["Salad", "Rolls", "Deserts", "Sandwich", "Pure Veg", "Pasta", "Noodles", "Cake"];

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", description: "", price: "", category: "Salad" });

  const onChange = e => setData(p => ({ ...p, [e.target.name]: e.target.value }));

  const reset = () => { setData({ name: "", description: "", price: "", category: "Salad" }); setImage(false); };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("description", data.description);
      fd.append("price", Number(data.price));
      fd.append("category", data.category);
      fd.append("image", image);
      const res = await axios.post(`${url}/api/food/add`, fd);
      if (res.data.success) { reset(); toast.success(res.data.message); }
      else toast.error(res.data.message);
    } catch { toast.error("Something went wrong."); }
    finally { setLoading(false); }
  };
  useEffect(() => {
    document.title = "Add - Product";
  }, []);
  return (
    <>
      <style>{styles}</style>
      <div className="add-wrap">
        <h1 className="add-page-title">New Menu Item</h1>
        <p className="add-page-sub">Add a dish to your restaurant menu</p>

        <div className="add-panel">

          {/* LEFT */}
          <div className="add-left">
            <span className="add-left-label">Dish Photo</span>
            <div className="upload-circle">
              <label htmlFor="img-upload">
                {image ? (
                  <>
                    <img src={URL.createObjectURL(image)} className="preview" alt="preview" />
                    <div className="upload-change-overlay">Change</div>
                  </>
                ) : (
                  <>
                    <span className="upload-circle-icon">🍴</span>
                    <span className="upload-circle-text">Tap to upload</span>
                  </>
                )}
              </label>
              <input type="file" id="img-upload" hidden accept="image/*" required
                onChange={e => setImage(e.target.files[0])} />
            </div>
            <span className="add-left-hint">PNG · JPG · max 10 MB</span>
          </div>

          {/* RIGHT */}
          <form className="add-right" onSubmit={onSubmit}>

            <div className="f-group">
              <label className="f-label">Item Name</label>
              <input className="f-input" type="text" name="name"
                placeholder="e.g. Grilled Caesar Salad"
                value={data.name} onChange={onChange} required />
            </div>

            <div className="f-group">
              <label className="f-label">Description</label>
              <textarea className="f-input" name="description" rows="3"
                placeholder="Fresh romaine, parmesan, house dressing…"
                value={data.description} onChange={onChange} required />
            </div>

            <div className="f-group">
              <label className="f-label">Category</label>
              <div className="cat-wrap">
                {CATS.map(c => (
                  <button key={c} type="button"
                    className={`cat-pill${data.category === c ? " on" : ""}`}
                    onClick={() => setData(p => ({ ...p, category: c }))}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="bottom-row">
              <div className="f-group">
                <label className="f-label">Price</label>
                <div className="price-wrap">
                  <span className="price-sym">$</span>
                  <input className="f-input" type="number" name="price"
                    placeholder="0.00" min="0" step="0.01"
                    value={data.price} onChange={onChange} required />
                </div>
              </div>

              <div className="btn-row">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "Saving…" : "＋ Add Item"}
                </button>
                <button type="button" className="btn-reset" onClick={reset}>Reset</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Add;