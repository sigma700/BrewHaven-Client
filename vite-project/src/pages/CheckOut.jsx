import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {TbCreditCard, TbLock, TbTruckDelivery} from "react-icons/tb";
import {useBasket} from "../store/stateFiles";
import {Link} from "react-router-dom";

/* ── GLOBAL STYLES ─────────────────────────────────────────── */
const CheckoutStyles = () => (
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

    .co-root {
      min-height: 100vh;
      background: var(--bone);
      font-family: 'Josefin Sans', sans-serif;
      color: var(--espresso);
    }

    /* Grain overlay */
    .co-root::after {
      content: '';
      position: fixed; inset: 0;
      pointer-events: none; z-index: 9999;
      opacity: 0.022;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-repeat: repeat; background-size: 128px;
    }

    .serif { font-family: 'Playfair Display', serif; }

    /* ── HERO BAR ── */
    .co-hero {
      position: relative; overflow: hidden;
      height: 220px;
      display: flex; align-items: flex-end;
      padding: 0 48px 40px;
    }
    .co-hero-video {
      position: absolute; inset: 0;
      width: 100%; height: 100%;
      object-fit: cover;
      filter: brightness(0.42) saturate(1.1);
      z-index: 0;
    }
    .co-hero-overlay {
      position: absolute; inset: 0; z-index: 1;
      background:
        linear-gradient(to right, rgba(14,6,1,0.9) 0%, rgba(14,6,1,0.55) 60%, rgba(14,6,1,0.2) 100%),
        linear-gradient(to top, rgba(14,6,1,0.8) 0%, transparent 50%);
    }
    .co-hero-content {
      position: relative; z-index: 2;
      max-width: 1280px; width: 100%; margin: 0 auto;
    }
    .co-hero-eyebrow {
      display: flex; align-items: center; gap: 14px;
      margin-bottom: 10px;
    }
    .rule { width: 40px; height: 1px; background: var(--caramel); display: inline-block; }
    .eyebrow {
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.6rem; letter-spacing: 0.32em;
      text-transform: uppercase; color: var(--caramel); font-weight: 600;
    }

    /* ── SECTION CARD ── */
    .co-card {
      background: #fff;
      border: 1px solid rgba(193,125,60,0.13);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 4px 40px rgba(28,10,0,0.06);
      margin-bottom: 24px;
    }

    .co-section-label {
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.6rem; letter-spacing: 0.3em;
      text-transform: uppercase; color: var(--caramel); font-weight: 600;
      margin-bottom: 6px; display: block;
    }

    /* ── FORM INPUTS ── */
    .co-label {
      display: block;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.68rem; letter-spacing: 0.16em;
      text-transform: uppercase; font-weight: 600;
      color: rgba(28,10,0,0.55);
      margin-bottom: 8px;
    }
    .co-input {
      width: 100%;
      padding: 14px 18px;
      border: 1.5px solid rgba(193,125,60,0.2);
      border-radius: 14px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.88rem; font-weight: 300;
      color: var(--espresso);
      background: #fff;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      letter-spacing: 0.03em;
    }
    .co-input::placeholder { color: rgba(28,10,0,0.25); }
    .co-input:focus {
      border-color: var(--caramel);
      box-shadow: 0 0 0 3px rgba(193,125,60,0.1);
    }
    .co-input-wrap { position: relative; }
    .co-input-icon {
      position: absolute; right: 16px; top: 50%;
      transform: translateY(-50%);
      color: rgba(28,10,0,0.25); font-size: 1.1rem;
      pointer-events: none;
    }

    /* ── PAYMENT OPTIONS ── */
    .pay-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 0;
    }
    .pay-btn {
      border-radius: 16px;
      padding: 14px 10px;
      border: 1.5px solid rgba(193,125,60,0.18);
      background: #fff;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.28s ease;
    }
    .pay-btn:hover {
      border-color: var(--caramel);
      box-shadow: 0 6px 24px rgba(193,125,60,0.14);
      transform: translateY(-2px);
    }
    .pay-btn.selected {
      border-color: var(--caramel);
      background: rgba(193,125,60,0.07);
      box-shadow: 0 0 0 3px rgba(193,125,60,0.15);
      transform: translateY(-2px);
    }

    /* ── PAYMENT DETAIL PANEL ── */
    .pay-panel {
      margin-top: 20px;
      padding: 24px;
      background: rgba(193,125,60,0.05);
      border: 1px solid rgba(193,125,60,0.18);
      border-radius: 18px;
      overflow: hidden;
    }
    .pay-notice {
      margin-top: 12px;
      padding: 14px 16px;
      background: #fff;
      border: 1px solid rgba(193,125,60,0.15);
      border-radius: 12px;
      font-size: 0.8rem;
      color: rgba(28,10,0,0.5);
      line-height: 1.65;
      font-weight: 300;
    }

    /* ── KLARNA OPTIONS ── */
    .klarna-opts {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin-top: 12px;
    }
    .klarna-opt {
      padding: 12px;
      background: #fff;
      border: 1px solid rgba(193,125,60,0.15);
      border-radius: 12px;
      text-align: center;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.72rem; letter-spacing: 0.12em;
      text-transform: uppercase; font-weight: 600;
      color: var(--espresso);
    }

    /* ── DIVIDER ── */
    .divider {
      height: 1px;
      background: linear-gradient(to right, rgba(193,125,60,0.25), transparent);
      margin: 20px 0;
    }

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
      display: flex; align-items: center; justify-content: center; gap: 10px;
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

    /* ── FORM GRID ── */
    .form-row-2 {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    }
    .form-field { display: flex; flex-direction: column; }

    /* ── EMPTY STATE ── */
    .empty-card {
      background: #fff;
      border: 1px solid rgba(193,125,60,0.13);
      border-radius: 28px; padding: 64px 48px;
      text-align: center; max-width: 520px; margin: 0 auto;
      box-shadow: 0 4px 40px rgba(28,10,0,0.06);
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--caramel); border-radius: 2px; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .co-layout { flex-direction: column !important; }
      .co-summary { position: static !important; width: 100% !important; }
    }
    @media (max-width: 640px) {
      .co-hero { height: 160px; padding: 0 24px 28px; }
      .form-row-2 { grid-template-columns: 1fr; }
      .pay-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════════
   CHECKOUT COMPONENT
══════════════════════════════════════════════════════════════ */
const Checkout = () => {
  const {cart, getTotalItems, getTotalPrice, clearCart} = useBasket();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    paypalEmail: "",
    klarnaSSN: "",
    afterpayPhone: "",
    applePayEmail: "",
  });

  const paymentOptions = [
    {name: "Apple Pay", logo: "/apple-pay-svgrepo-com.svg", type: "apple"},
    {name: "Klarna", logo: "/klarna-logo-svgrepo-com.svg", type: "klarna"},
    {name: "PayPal", logo: "/paypal-svgrepo-com.svg", type: "paypal"},
    {
      name: "AfterPay",
      logo: "/brand-afterpay-svgrepo-com.svg",
      type: "afterpay",
    },
  ];

  const handleInputChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    console.log("Order placed:", {...formData, paymentMethod: selectedPayment});
    clearCart();
  };

  /* ── Shared hero bar ── */
  const HeroBar = ({subtitle}) => (
    <div className="co-hero">
      <video
        className="co-hero-video"
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
      <div className="co-hero-overlay" />
      <div className="co-hero-content">
        <div className="co-hero-eyebrow">
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
          Checkout
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

  /* ── Payment detail panels ── */
  const renderPaymentForm = () => {
    const panels = {
      apple: {
        title: "Apple Pay",
        content: (
          <>
            <div className="form-field">
              <label className="co-label">Apple ID Email</label>
              <input
                className="co-input"
                type="email"
                name="applePayEmail"
                value={formData.applePayEmail}
                onChange={handleInputChange}
                placeholder="your@appleid.com"
                required
              />
            </div>
            <div className="pay-notice">
              You'll be redirected to Apple Pay to complete your purchase
              securely.
            </div>
          </>
        ),
      },
      klarna: {
        title: "Klarna",
        content: (
          <>
            <div className="form-field">
              <label className="co-label">Personal Identity Number (SSN)</label>
              <input
                className="co-input"
                type="text"
                name="klarnaSSN"
                value={formData.klarnaSSN}
                onChange={handleInputChange}
                placeholder="Enter your SSN"
                required
              />
            </div>
            <div className="klarna-opts">
              <div className="klarna-opt">Pay in 30 days</div>
              <div className="klarna-opt">Installments</div>
            </div>
          </>
        ),
      },
      paypal: {
        title: "PayPal",
        content: (
          <>
            <div className="form-field">
              <label className="co-label">PayPal Email</label>
              <input
                className="co-input"
                type="email"
                name="paypalEmail"
                value={formData.paypalEmail}
                onChange={handleInputChange}
                placeholder="your@paypal.com"
                required
              />
            </div>
            <div className="pay-notice">
              You'll be redirected to PayPal to complete your payment securely.
            </div>
          </>
        ),
      },
      afterpay: {
        title: "AfterPay",
        content: (
          <>
            <div className="form-field">
              <label className="co-label">Phone Number</label>
              <input
                className="co-input"
                type="tel"
                name="afterpayPhone"
                value={formData.afterpayPhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div className="pay-notice">
              Pay in 4 interest-free installments. First payment due today.
            </div>
          </>
        ),
      },
    };

    const active = panels[selectedPayment];
    if (!active) return null;

    return (
      <motion.div
        key={selectedPayment}
        className="pay-panel"
        initial={{opacity: 0, height: 0}}
        animate={{opacity: 1, height: "auto"}}
        exit={{opacity: 0, height: 0}}
        transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
      >
        <div style={{marginBottom: 18}}>
          <span className="co-section-label">Selected Method</span>
          <h3
            className="serif"
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--espresso)",
            }}
          >
            {active.title}
          </h3>
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: 12}}>
          {active.content}
        </div>
      </motion.div>
    );
  };

  /* ── EMPTY STATE ── */
  if (cart.length === 0) {
    return (
      <main className="co-root">
        <CheckoutStyles />
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
                Nothing to checkout
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
                Your cart is empty. Head back to the shop
                <br />
                and find something worth brewing.
              </p>
              <Link to="/#products" style={{textDecoration: "none"}}>
                <button
                  className="btn-primary"
                  style={{maxWidth: 280, margin: "0 auto"}}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  /* ── FILLED CHECKOUT ── */
  return (
    <main className="co-root">
      <CheckoutStyles />
      <HeroBar subtitle="Complete your order with confidence" />

      <div
        style={{maxWidth: 1280, margin: "0 auto", padding: "56px 32px 96px"}}
      >
        <motion.div
          initial={{opacity: 0, y: 24}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          {/* Back link */}
          <Link
            to="/cart"
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
            ← Back to Cart
          </Link>

          {/* Two-column layout */}
          <div
            className="co-layout"
            style={{display: "flex", gap: 32, alignItems: "flex-start"}}
          >
            {/* ── LEFT: Form ── */}
            <div style={{flex: "1 1 0%", minWidth: 0}}>
              <form onSubmit={handleSubmit}>
                {/* Contact */}
                <motion.div
                  className="co-card"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.05}}
                >
                  <span className="co-section-label">Step 1</span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "var(--espresso)",
                      marginBottom: 24,
                    }}
                  >
                    Contact Information
                  </h2>
                  <div className="form-field">
                    <label className="co-label">Email Address</label>
                    <input
                      className="co-input"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </motion.div>

                {/* Shipping */}
                <motion.div
                  className="co-card"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.12}}
                >
                  <span className="co-section-label">Step 2</span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "var(--espresso)",
                      marginBottom: 24,
                    }}
                  >
                    Shipping Address
                  </h2>
                  <div
                    style={{display: "flex", flexDirection: "column", gap: 16}}
                  >
                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="co-label">First Name</label>
                        <input
                          className="co-input"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="co-label">Last Name</label>
                        <input
                          className="co-input"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-field">
                      <label className="co-label">Street Address</label>
                      <input
                        className="co-input"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="co-label">City</label>
                        <input
                          className="co-input"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label className="co-label">ZIP Code</label>
                        <input
                          className="co-input"
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Payment */}
                <motion.div
                  className="co-card"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: 0.2}}
                >
                  <span className="co-section-label">Step 3</span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: "var(--espresso)",
                      marginBottom: 8,
                    }}
                  >
                    Payment Method
                  </h2>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(28,10,0,0.4)",
                      letterSpacing: "0.04em",
                      fontWeight: 300,
                      marginBottom: 24,
                    }}
                  >
                    Select a payment method or enter card details below
                  </p>

                  {/* Payment option pills */}
                  <div className="pay-grid">
                    {paymentOptions.map((item) => (
                      <motion.button
                        key={item.type}
                        type="button"
                        className={`pay-btn${selectedPayment === item.type ? " selected" : ""}`}
                        whileTap={{scale: 0.94}}
                        onClick={() =>
                          setSelectedPayment(
                            selectedPayment === item.type ? null : item.type,
                          )
                        }
                        title={item.name}
                      >
                        <img
                          src={item.logo}
                          alt={item.name}
                          style={{
                            width: "100%",
                            maxWidth: 72,
                            height: 32,
                            objectFit: "contain",
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Dynamic payment panel */}
                  <AnimatePresence mode="wait">
                    {renderPaymentForm()}
                  </AnimatePresence>

                  {/* Default credit card form */}
                  <AnimatePresence>
                    {!selectedPayment && (
                      <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.3}}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 16,
                          marginTop: 20,
                        }}
                      >
                        <div
                          style={{
                            padding: "6px 0 14px",
                            borderBottom: "1px solid rgba(193,125,60,0.15)",
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Josefin Sans', sans-serif",
                              fontSize: "0.6rem",
                              letterSpacing: "0.24em",
                              textTransform: "uppercase",
                              color: "rgba(28,10,0,0.35)",
                              fontWeight: 600,
                            }}
                          >
                            Or pay with card
                          </span>
                        </div>

                        <div className="form-field">
                          <label className="co-label">Name on Card</label>
                          <input
                            className="co-input"
                            type="text"
                            name="nameOnCard"
                            value={formData.nameOnCard}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-field">
                          <label className="co-label">Card Number</label>
                          <div className="co-input-wrap">
                            <input
                              className="co-input"
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234  5678  9012  3456"
                              style={{paddingRight: 48}}
                              required
                            />
                            <TbCreditCard className="co-input-icon" />
                          </div>
                        </div>

                        <div className="form-row-2">
                          <div className="form-field">
                            <label className="co-label">Expiry Date</label>
                            <input
                              className="co-input"
                              type="text"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              placeholder="MM / YY"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label className="co-label">CVV</label>
                            <input
                              className="co-input"
                              type="text"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              placeholder="• • •"
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </div>

            {/* ── RIGHT: Order summary ── */}
            <div
              className="co-summary"
              style={{width: 360, flexShrink: 0, position: "sticky", top: 24}}
            >
              <div className="co-card" style={{marginBottom: 0}}>
                {/* Header */}
                <div style={{marginBottom: 28}}>
                  <span className="co-section-label">Your Order</span>
                  <h2
                    className="serif"
                    style={{
                      fontSize: "1.7rem",
                      fontWeight: 600,
                      color: "var(--espresso)",
                    }}
                  >
                    Order Summary
                  </h2>
                </div>

                {/* Mini cart items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{display: "flex", gap: 12, alignItems: "center"}}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                          overflow: "hidden",
                          flexShrink: 0,
                          border: "1px solid rgba(193,125,60,0.1)",
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
                      <div style={{flex: 1, minWidth: 0}}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <span
                            className="serif"
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              color: "var(--espresso)",
                            }}
                          >
                            {item.name}
                          </span>
                          <span
                            style={{
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              color: "var(--caramel)",
                            }}
                          >
                            $
                            {(
                              parseFloat(item.price.replace("$", "")) *
                              item.quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            letterSpacing: "0.12em",
                            color: "rgba(28,10,0,0.35)",
                            textTransform: "uppercase",
                            fontWeight: 600,
                          }}
                        >
                          Qty {item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="divider" />

                {/* Price breakdown */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  {[
                    {
                      label: `Subtotal (${getTotalItems()} items)`,
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
                  <button className="btn-primary" onClick={handleSubmit}>
                    <TbLock size={16} />
                    Place Order
                  </button>
                  <Link to="/cart" className="btn-outline">
                    Back to Cart
                  </Link>
                </div>

                {/* Info notices */}
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {[
                    {
                      icon: (
                        <TbTruckDelivery
                          size={18}
                          style={{color: "var(--caramel)", flexShrink: 0}}
                        />
                      ),
                      title: "Free Shipping",
                      body: "Orders over $50 qualify for free shipping",
                      bg: "rgba(193,125,60,0.07)",
                      border: "rgba(193,125,60,0.18)",
                    },
                    {
                      icon: (
                        <TbLock
                          size={18}
                          style={{color: "#16a34a", flexShrink: 0}}
                        />
                      ),
                      title: "Secure Payment",
                      body: "Your payment information is encrypted and secure",
                      bg: "rgba(22,163,74,0.06)",
                      border: "rgba(22,163,74,0.18)",
                    },
                  ].map(({icon, title, body, bg, border}) => (
                    <div
                      key={title}
                      style={{
                        padding: "14px 16px",
                        background: bg,
                        border: `1px solid ${border}`,
                        borderRadius: 14,
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{marginTop: 1}}>{icon}</div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Josefin Sans', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            color: "var(--espresso)",
                            marginBottom: 4,
                          }}
                        >
                          {title}
                        </div>
                        <p
                          style={{
                            fontSize: "0.78rem",
                            color: "rgba(28,10,0,0.45)",
                            lineHeight: 1.6,
                            fontWeight: 300,
                          }}
                        >
                          {body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;
