import React, { useEffect, useState } from 'react'

const Header = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,800;0,900;1,800&family=Manrope:wght@400;500;600;700&display=swap');

        .h5 {
          width: 100%;
          margin: 30px auto;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          height: 38vw;
          min-height: 440px;
          font-family: 'Manrope', sans-serif;
          background: #1C0A00;
          display: flex;
        }

        /* ── LEFT PANEL ── */
        .h5-left {
          width: 50%;
          height: 100%;
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 4vw 0 5vw;
          background: linear-gradient(135deg, #1C0A00 60%, #2e1200 100%);
          overflow: hidden;
        }

        /* warm radial glow behind text */
        .h5-left::before {
          content: '';
          position: absolute;
          width: 70%;
          height: 80%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,0.18) 0%, transparent 70%);
          top: 10%;
          left: -10%;
          pointer-events: none;
        }

        /* ── RIGHT PANEL ── */
        .h5-right {
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        /* Real food image fills right side */
        .h5-food-photo {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=90');
          background-size: cover;
          background-position: center center;
          transform: ${loaded ? 'scale(1)' : 'scale(1.08)'};
          transition: transform 2s cubic-bezier(.25,.46,.45,.94);
        }

        /* left-to-right fade so it blends into dark left panel */
        .h5-food-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, #1C0A00 0%, rgba(28,10,0,0.18) 28%, transparent 100%);
          z-index: 1;
        }

        /* bottom vignette on photo */
        .h5-food-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(to top, rgba(28,10,0,0.7) 0%, transparent 100%);
          z-index: 1;
        }

        /* ── CONTENT ── */
        .h5-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(249,115,22,0.15);
          border: 1px solid rgba(249,115,22,0.35);
          border-radius: 100px;
          padding: 5px 14px 5px 6px;
          width: fit-content;
          margin-bottom: 1.3vw;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(14px)'};
          transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
        }

        .h5-pill-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #F97316;
          box-shadow: 0 0 8px rgba(249,115,22,0.8);
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:.4; }
        }

        .h5-pill span {
          font-size: max(0.7vw, 11px);
          font-weight: 600;
          color: #FDBA74;
          letter-spacing: 0.04em;
        }

        .h5-heading {
          font-family: 'Fraunces', serif;
          font-size: max(4.4vw, 28px);
          font-weight: 900;
          color: #fff;
          line-height: 1.08;
          margin: 0 0 1vw 0;
          letter-spacing: -0.02em;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(22px)'};
          transition: opacity 0.6s ease 0.22s, transform 0.6s ease 0.22s;
        }

        .h5-heading em {
          font-style: italic;
          color: #FB923C;
        }

        .h5-sub {
          font-size: max(0.9vw, 12px);
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          margin: 0 0 1.8vw 0;
          max-width: 360px;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(14px)'};
          transition: opacity 0.6s ease 0.36s, transform 0.6s ease 0.36s;
        }

        /* rating row */
        .h5-rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1.6vw;
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.6s ease 0.46s;
        }

        .h5-avatars {
          display: flex;
        }

        .h5-avatar {
          width: max(2vw, 26px);
          height: max(2vw, 26px);
          border-radius: 50%;
          border: 2px solid #1C0A00;
          margin-left: -7px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .h5-avatar:first-child { margin-left: 0; }

        .h5-avatar img {
          width: 100%; height: 100%; object-fit: cover;
        }

        .h5-rating-text {
          font-size: max(0.78vw, 11px);
          color: rgba(255,255,255,0.55);
          font-weight: 500;
        }

        .h5-rating-text strong {
          color: #FBBF24;
          font-weight: 700;
        }

        /* buttons */
        .h5-btns {
          display: flex;
          align-items: center;
          gap: max(0.8vw, 10px);
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(14px)'};
          transition: opacity 0.6s ease 0.56s, transform 0.6s ease 0.56s;
        }

        .h5-btn-main {
          background: #F97316;
          color: #fff;
          border: none;
          font-family: 'Manrope', sans-serif;
          font-weight: 700;
          font-size: max(0.9vw, 13px);
          padding: max(0.85vw, 12px) max(2vw, 22px);
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(249,115,22,0.45);
          transition: transform .18s, box-shadow .18s;
          white-space: nowrap;
        }

        .h5-btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(249,115,22,0.55);
        }

        .h5-btn-ghost {
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.75);
          border: 1.5px solid rgba(255,255,255,0.15);
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          font-size: max(0.9vw, 13px);
          padding: max(0.85vw, 12px) max(2vw, 22px);
          border-radius: 12px;
          cursor: pointer;
          transition: background .18s, border-color .18s, transform .18s;
          white-space: nowrap;
        }

        .h5-btn-ghost:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
          transform: translateY(-2px);
        }

        /* ── FLOATING CARDS on right ── */
        .h5-card-tl {
          position: absolute;
          top: 7%;
          left: 5%;
          z-index: 4;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 16px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(-14px)'};
          transition: opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s;
        }

        .h5-card-icon {
          font-size: max(1.4vw, 20px);
          line-height: 1;
        }

        .h5-card-title {
          font-size: max(0.78vw, 12px);
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .h5-card-sub {
          font-size: max(0.65vw, 10px);
          color: rgba(255,255,255,0.55);
          margin-top: 3px;
        }

        .h5-card-br {
          position: absolute;
          bottom: 10%;
          right: 4%;
          z-index: 4;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 16px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: ${loaded ? 1 : 0};
          transform: ${loaded ? 'translateY(0)' : 'translateY(14px)'};
          transition: opacity 0.6s ease 1s, transform 0.6s ease 1s;
        }

        .h5-deliver-icon {
          width: max(2.2vw, 30px);
          height: max(2.2vw, 30px);
          border-radius: 10px;
          background: rgba(249,115,22,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: max(1vw, 15px);
          flex-shrink: 0;
        }

        /* ── BOTTOM STATS ── */
        .h5-stats {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 5;
          display: flex;
          background: rgba(10,4,0,0.65);
          backdrop-filter: blur(14px);
          border-top: 1px solid rgba(255,255,255,0.07);
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.5s ease 1.1s;
        }

        .h5-stat {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: max(0.8vw, 11px) 0;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .h5-stat:last-child { border-right: none; }

        .h5-stat-emoji { font-size: max(1.1vw, 15px); }

        .h5-stat-val {
          font-family: 'Fraunces', serif;
          font-size: max(0.95vw, 13px);
          font-weight: 800;
          color: #fff;
          line-height: 1;
        }

        .h5-stat-lbl {
          font-size: max(0.6vw, 9px);
          color: rgba(255,255,255,0.38);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 600;
          margin-top: 2px;
        }

        @media (max-width: 900px) {
          .h5 { height: 60vw; }
          .h5-card-br, .h5-card-tl { display: none; }
        }

        @media (max-width: 640px) {
          .h5 { height: auto; flex-direction: column-reverse; }
          .h5-left { width: 100%; padding: 5vw; min-height: 260px; }
          .h5-right { height: 50vw; }
          .h5-sub { display: none; }
          .h5-btn-ghost { display: none; }
          .h5-stats { position: relative; }
        }
      `}</style>

      <div className="h5">

        {/* ── LEFT PANEL ── */}
        <div className="h5-left">
          <div className="h5-pill">
            <div className="h5-pill-dot" />
            <span>Free delivery on first order</span>
          </div>

          <h1 className="h5-heading">
            Order Your<br />
            <em>Favourite</em><br />
            Food Here
          </h1>

          <p className="h5-sub">
            Choose your favourite dish and enjoy exclusive discounts on every order — restaurant-quality meals, delivered fast.
          </p>

          <div className="h5-rating">
            <div className="h5-avatars">
              {[
                'https://i.pravatar.cc/40?img=1',
                'https://i.pravatar.cc/40?img=5',
                'https://i.pravatar.cc/40?img=9',
                'https://i.pravatar.cc/40?img=12',
              ].map((src, i) => (
                <div className="h5-avatar" key={i}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
            <span className="h5-rating-text">
              <strong>★ 4.9</strong> · 3,200+ happy customers
            </span>
          </div>

          <div className="h5-btns">
            <button className="h5-btn-main">View Menu</button>
            <button className="h5-btn-ghost">Reserve a Table</button>
          </div>
        </div>

        {/* ── RIGHT PANEL — real food photo ── */}
        <div className="h5-right">
          <div className="h5-food-photo" />
          <div className="h5-food-fade" />
          <div className="h5-food-bottom" />

          {/* Top-left floating card */}
          <div className="h5-card-tl">
            <span className="h5-card-icon">🔥</span>
            <div>
              <div className="h5-card-title">Chef's Special Today</div>
              <div className="h5-card-sub">Grilled Salmon · Limited Stock</div>
            </div>
          </div>

          {/* Bottom-right floating card */}
          <div className="h5-card-br">
            <div className="h5-deliver-icon">🛵</div>
            <div>
              <div className="h5-card-title">Fast Delivery</div>
              <div className="h5-card-sub">Avg. 28 min · Free above ₹299</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM STATS BAR ── */}
        <div className="h5-stats">
          {[
            { e: '🍽️', v: '80+ Dishes', l: 'On the menu' },
            { e: '⚡', v: '28 Minutes', l: 'Avg. delivery' },
            { e: '⭐', v: '4.9 / 5.0', l: 'Guest rating' },
            { e: '🎁', v: '20% Off', l: 'First order' },
          ].map((s, i) => (
            <div className="h5-stat" key={i}>
              <span className="h5-stat-emoji">{s.e}</span>
              <div>
                <div className="h5-stat-val">{s.v}</div>
                <div className="h5-stat-lbl">{s.l}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default Header