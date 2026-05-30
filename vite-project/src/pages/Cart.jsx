import React from "react";
import {useBasket} from "../store/stateFiles";
import {motion, AnimatePresence} from "framer-motion";
import {TbTruckDelivery} from "react-icons/tb";
import {Link} from "react-router-dom";

/* ── GLOBAL STYLES ─────────────────────────────────────────── */
const CartStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,300;1,400;1,600&family=Josefin+Sans:wght@300;400;600&display=swap');

    :root {
      --espresso: #1C0A00;
      --roast:    #3B1A08;
      --caramel:  #C17D3C;
      --cream:    #F5EDD8;
      --fog:      #EDE5D5;
      --bone:     #FAF6EF;
      --ink:      #0E0601;
    }

    .cart-root {
      min-height: 100vh;
      background: var(--bone);
      font-family: 'Josefin Sans', sans-serif;
      color: var(--espresso);
    }

    /* Grain overlay */
    .cart-root::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.022;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 128px;
    }

    .serif { font-family: 'Playfair Display', serif; }

    /* ── HERO BAR ── */
    .cart-hero {
      position: relative;
      overflow: hidden;
      height: 220px;
      display: flex;
      align-items: flex-end;
      padding: 0 48px 40px;
    }
    .cart-hero-video {
      position: absolute;
      inset: 0; width: 100%; height: 100%;
      object-fit: cover;
      filter: brightness(0.42) saturate(1.1);
      z-index: 0;
    }
    .cart-hero-overlay {
      position: absolute; inset: 0; z-index: 1;
      background:
        linear-gradient(to right, rgba(14,6,1,0.88) 0%, rgba(14,6,1,0.55) 60%, rgba(14,6,1,0.2) 100%),
        linear-gradient(to top, rgba(14,6,1,0.8) 0%, transparent 50%);
    }
    .cart-hero-content {
      position: relative; z-index: 2;
      max-width: 1280px; width: 100%; margin: 0 auto;
    }
    .cart-hero-eyebrow {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 10px;
    }
    .rule { width: 40px; height: 1px; background: var(--caramel); display: inline-block; }
    .eyebrow {
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.6rem; letter-spacing: 0.32em;
      text-transform: uppercase; color: var(--caramel); font-weight: 600;
    }

    /* ── CART CARD ── */
    .cart-card {
      background: #fff;
      border: 1px solid rgba(193,125,60,0.13);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 4px 40px rgba(28,10,0,0.06);
    }

    /* ── ITEM ROW ── */
    .cart-item {
      display: flex;
      gap: 20px;
      padding: 20px;
      border: 1px solid rgba(193,125,60,0.12);
      border-radius: 18px;
      transition: box-shadow 0.3s ease, transform 0.3s ease;
      background: #fff;
    }
    .cart-item:hover {
      box-shadow: 0 12px 40px rgba(28,10,0,0.09);
      transform: translateY(-2px);
    }

    /* ── QTY CONTROL ── */
    .qty-btn {
      width: 28px; height: 28px; border-radius: 50%;
      border: 1.5px solid rgba(28,10,0,0.15);
      background: transparent; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; color: var(--espresso);
      transition: all 0.2s ease;
      font-family: 'Josefin Sans', sans-serif;
    }
    .qty-btn:hover:not(:disabled) {
      background: var(--caramel); color: #fff;
      border-color: var(--caramel);
    }
    .qty-btn:disabled { opacity: 0.35; cursor: not-allowed; }

    /* ── REMOVE BTN ── */
    .remove-btn {
      background: transparent; border: none; cursor: pointer;
      width: 28px; height: 28px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: rgba(28,10,0,0.3); font-size: 0.9rem;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .remove-btn:hover { background: rgba(220,38,38,0.08); color: #dc2626; }

    /* ── BUTTONS ── */
    .btn-primary {
      position: relative; overflow: hidden;
      background: var(--espresso); color: var(--cream);
      border: none; cursor: pointer;
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 600; letter-spacing: 0.18em;
      font-size: 0.72rem; text-transform: uppercase;
      padding: 16px 36px; border-radius: 60px;
      transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
      width: 100%;
    }
    .btn-primary:hover {
      background: var(--roast);
      box-shadow: 0 12px 40px rgba(28,10,0,0.28);
      transform: translateY(-1px);
    }
    .btn-outline {
      background: transparent; color: var(--espresso);
      border: 1.5px solid rgba(28,10,0,0.22); cursor: pointer;
      font-family: 'Josefin Sans', sans-serif;
      font-weight: 400; letter-spacing: 0.18em;
      font-size: 0.72rem; text-transform: uppercase;
      padding: 15px 36px; border-radius: 60px;
      transition: all 0.3s ease; width: 100%;
      text-align: center; display: block; text-decoration: none;
    }
    .btn-outline:hover {
      background: var(--espresso); color: var(--cream);
      border-color: var(--espresso);
    }
    .clear-btn {
      background: transparent; border: none; cursor: pointer;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.65rem; letter-spacing: 0.16em;
      text-transform: uppercase; font-weight: 600;
      color: rgba(220,38,38,0.55);
      transition: color 0.2s ease;
      padding: 6px 0;
    }
    .clear-btn:hover { color: #dc2626; }

    /* ── DIVIDER ── */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(193,125,60,0.25), transparent);
      margin: 20px 0;
    }

    /* ── EMPTY STATE ── */
    .empty-card {
      background: #fff;
      border: 1px solid rgba(193,125,60,0.13);
      border-radius: 28px;
      padding: 64px 48px;
      text-align: center;
      max-width: 520px;
      margin: 0 auto;
      box-shadow: 0 4px 40px rgba(28,10,0,0.06);
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--caramel); border-radius: 2px; }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .cart-hero { height: 160px; padding: 0 24px 28px; }
      .cart-layout { flex-direction: column !important; }
      .cart-summary { position: static !important; }
      .cart-item { flex-direction: column; }
      .cart-item-img { width: 100% !important; height: 180px !important; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════
   CART COMPONENT
══════════════════════════════════════════════════════════════ */
const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useBasket();

  /* ── Shared hero bar ── */
  const HeroBar = ({subtitle}) => (
    <div className="cart-hero">
      <video
        className="cart-hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.pexels.com/videos/6393024/pexels-photo-6393024.jpeg"
      >
        <source
          src="https://videos.pexels.com/video-files/6393024/6393024-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/3191596/3191596-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="cart-hero-overlay" />
      <div className="cart-hero-content">
        <div className="cart-hero-eyebrow">
          <span className="rule" />
          <span className="eyebrow">BrewHaven · Artisan Coffee Co.</span>
        </div>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 600,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Your Shopping Cart
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              color: "rgba(245,237,216,0.5)",
              marginTop: 6,
              fontWeight: 300,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  /* ── EMPTY STATE ── */
  if (cart.length === 0) {
    return (
      <main className="cart-root">
        <CartStyles />
        <HeroBar />

        <div style={{maxWidth: 1280, margin: "0 auto", padding: "72px 32px"}}>
          <motion.div
            initial={{opacity: 0, y: 28}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
          >
            <div className="empty-card">
              <img
                src="/shopping-cart (1).svg"
                alt="Empty cart"
                style={{
                  width: 120,
                  margin: "0 auto 32px",
                  display: "block",
                  opacity: 0.35,
                }}
              />
              <h2
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "var(--espresso)",
                  marginBottom: 12,
                }}
              >
                Your cart is empty
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                  color: "rgba(28,10,0,0.45)",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                  marginBottom: 40,
                }}
              >
                Looks like you haven't added anything yet.
                <br />
                Let's fix that.
              </p>
              <a href="/#products" style={{textDecoration: "none"}}>
                <button
                  className="btn-primary"
                  style={{maxWidth: 280, margin: "0 auto"}}
                >
                  Continue Shopping
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* ── FILLED CART ── */
  return (
    <main className="cart-root">
      <CartStyles />

      <HeroBar
        subtitle={`${getTotalItems()} ${getTotalItems() === 1 ? "item" : "items"} in your cart`}
      />

      <div
        style={{maxWidth: 1280, margin: "0 auto", padding: "56px 32px 96px"}}
      >
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          {/* Back link */}
          <a
            href="/#products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--caramel)",
              textDecoration: "none",
              fontWeight: 600,
              marginBottom: 40,
              transition: "opacity 0.2s",
            }}
          >
            ← Back to Shop
          </a>

          {/* Two-column layout */}
          <div
            className="cart-layout"
            style={{display: "flex", gap: 32, alignItems: "flex-start"}}
          >
            {/* ── LEFT: Cart items ── */}
            <div style={{flex: "1 1 0%", minWidth: 0}}>
              <div className="cart-card">
                {/* Card header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 28,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontSize: "0.6rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        color: "var(--caramel)",
                        fontWeight: 600,
                      }}
                    >
                      Your Selection
                    </span>
                    <h2
                      className="serif"
                      style={{
                        fontSize: "1.7rem",
                        fontWeight: 600,
                        color: "var(--espresso)",
                        marginTop: 4,
                      }}
                    >
                      Cart Items
                    </h2>
                  </div>
                  <button className="clear-btn" onClick={clearCart}>
                    Clear All
                  </button>
                </div>

                {/* Item list */}
                <div
                  style={{display: "flex", flexDirection: "column", gap: 16}}
                >
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        className="cart-item"
                        initial={{opacity: 0, x: -24}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 24, height: 0, marginBottom: 0}}
                        transition={{duration: 0.45, delay: index * 0.07}}
                      >
                        {/* Product image */}
                        <div
                          className="cart-item-img"
                          style={{
                            width: 120,
                            height: 120,
                            flexShrink: 0,
                            borderRadius: 14,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>

                        {/* Details */}
                        <div style={{flex: 1, minWidth: 0}}>
                          {/* Name + remove */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: 6,
                            }}
                          >
                            <h3
                              className="serif"
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                color: "var(--espresso)",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {item.name}
                            </h3>
                            <button
                              className="remove-btn"
                              onClick={() => removeFromCart(item.id)}
                              title="Remove item"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Origin tag */}
                          {item.origin && (
                            <div
                              style={{
                                display: "inline-block",
                                background: "rgba(193,125,60,0.1)",
                                color: "var(--caramel)",
                                padding: "3px 12px",
                                borderRadius: 60,
                                fontSize: "0.6rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: 8,
                              }}
                            >
                              {item.origin}
                            </div>
                          )}

                          <p
                            style={{
                              fontSize: "0.82rem",
                              color: "rgba(28,10,0,0.45)",
                              lineHeight: 1.65,
                              marginBottom: 16,
                              fontWeight: 300,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {item.description}
                          </p>

                          {/* Price + qty + line total */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              gap: 12,
                            }}
                          >
                            {/* Unit price + qty */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                              }}
                            >
                              <span
                                className="serif"
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: 600,
                                  color: "var(--espresso)",
                                }}
                              >
                                {item.price}
                              </span>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <button
                                  className="qty-btn"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  −
                                </button>
                                <span
                                  style={{
                                    fontFamily: "'Josefin Sans', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    minWidth: 24,
                                    textAlign: "center",
                                    color: "var(--espresso)",
                                  }}
                                >
                                  {item.quantity}
                                </span>
                                <button
                                  className="qty-btn"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Line total */}
                            <div style={{textAlign: "right"}}>
                              <div
                                style={{
                                  fontSize: "0.58rem",
                                  letterSpacing: "0.22em",
                                  textTransform: "uppercase",
                                  color: "rgba(28,10,0,0.35)",
                                  fontWeight: 600,
                                  marginBottom: 2,
                                }}
                              >
                                Total
                              </div>
                              <div
                                className="serif"
                                style={{
                                  fontSize: "1.25rem",
                                  fontWeight: 600,
                                  color: "var(--caramel)",
                                }}
                              >
                                $
                                {(
                                  parseFloat(item.price.replace("$", "")) *
                                  item.quantity
                                ).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order summary ── */}
            <div
              className="cart-summary"
              style={{width: 360, flexShrink: 0, position: "sticky", top: 24}}
            >
              <div className="cart-card">
                {/* Summary header */}
                <div style={{marginBottom: 28}}>
                  <span
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--caramel)",
                      fontWeight: 600,
                    }}
                  >
                    Breakdown
                  </span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 600,
                      color: "var(--espresso)",
                      marginTop: 4,
                    }}
                  >
                    Order Summary
                  </h2>
                </div>

                {/* Line items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginBottom: 8,
                  }}
                >
                  {[
                    {
                      label: `Subtotal (${getTotalItems()} ${getTotalItems() === 1 ? "item" : "items"})`,
                      value: `$${getTotalPrice().toFixed(2)}`,
                      accent: false,
                    },
                    {label: "Shipping", value: "Free", accent: true},
                    {
                      label: "Tax (10%)",
                      value: `$${(getTotalPrice() * 0.1).toFixed(2)}`,
                      accent: false,
                    },
                  ].map(({label, value, accent}) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "rgba(28,10,0,0.5)",
                          fontWeight: 300,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: accent ? "#16a34a" : "var(--espresso)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="divider" />

                {/* Grand total */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 32,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: "var(--espresso)",
                    }}
                  >
                    Total
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "var(--espresso)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    ${(getTotalPrice() * 1.1).toFixed(2)}
                  </span>
                </div>

                {/* CTAs */}
                <div
                  style={{display: "flex", flexDirection: "column", gap: 12}}
                >
                  <Link to="/checkout" style={{textDecoration: "none"}}>
                    <button className="btn-primary">Proceed to Checkout</button>
                  </Link>
                  <a href="/#products" className="btn-outline">
                    Continue Shopping
                  </a>
                </div>

                {/* Free shipping notice */}
                <div
                  style={{
                    marginTop: 24,
                    padding: "16px 18px",
                    background: "rgba(193,125,60,0.07)",
                    border: "1px solid rgba(193,125,60,0.18)",
                    borderRadius: 14,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <TbTruckDelivery
                    size={20}
                    style={{
                      color: "var(--caramel)",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontSize: "0.68rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--espresso)",
                        marginBottom: 4,
                      }}
                    >
                      Free Shipping
                    </div>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "rgba(28,10,0,0.5)",
                        lineHeight: 1.6,
                        fontWeight: 300,
                      }}
                    >
                      Orders over $50 qualify for free shipping
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "center",
                    gap: 24,
                  }}
                >
                  {["Secure Checkout", "Easy Returns", "Ethically Sourced"].map(
                    (badge) => (
                      <div key={badge} style={{textAlign: "center"}}>
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "var(--caramel)",
                            margin: "0 auto 6px",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontSize: "0.55rem",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(28,10,0,0.35)",
                            fontWeight: 600,
                          }}
                        >
                          {badge}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Cart;
