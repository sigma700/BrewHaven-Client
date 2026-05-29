import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useBasket } from "../store/stateFiles";
import { Link } from "react-router-dom";
import BlogGrid from "./components/blog";
import ContactForm from "./components/contactForm";
import Footer from "./components/footer";
import { FullMenu } from "./components/mobileMenu";
import { MdShoppingCartCheckout } from "react-icons/md";

/* ── GLOBAL STYLES injected once ───────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

    :root {
      --espresso:   #1C0A00;
      --roast:      #3B1A08;
      --caramel:    #C17D3C;
      --cream:      #F5EDD8;
      --fog:        #EDE5D5;
      --bone:       #FAF6EF;
      --ink:        #0E0601;
      --mist:       rgba(245,237,216,0.06);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bone);
      color: var(--espresso);
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--caramel); border-radius: 2px; }

    .serif { font-family: 'Cormorant Garamond', serif; }

    /* Grain overlay */
    .grain::after {
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

    /* Nav link underline */
    .nav-link {
      position: relative;
      color: var(--espresso);
      font-size: 0.8rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      text-decoration: none;
      transition: color 0.3s;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 0;
      width: 0; height: 1px;
      background: var(--caramel);
      transition: width 0.35s ease;
    }
    .nav-link:hover { color: var(--caramel); }
    .nav-link:hover::after { width: 100%; }

    /* Product card */
    .product-card {
      position: relative;
      background: #fff;
      border: 1px solid rgba(193,125,60,0.12);
      border-radius: 24px;
      overflow: hidden;
      transition: box-shadow 0.4s ease, transform 0.4s ease;
    }
    .product-card:hover {
      box-shadow: 0 32px 80px rgba(28,10,0,0.14);
      transform: translateY(-6px);
    }
    .product-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(193,125,60,0.04), transparent 60%);
      opacity: 0;
      transition: opacity 0.4s;
      z-index: 0;
      pointer-events: none;
    }
    .product-card:hover::before { opacity: 1; }

    /* History card */
    .history-card { position: relative; overflow: hidden; border-radius: 16px; }
    .history-card .overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(28,10,0,0.88) 0%, transparent 55%);
      opacity: 0; transition: opacity 0.45s ease;
    }
    .history-card:hover .overlay { opacity: 1; }
    .history-card .card-text {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 20px;
      transform: translateY(16px); opacity: 0;
      transition: all 0.45s ease 0.05s;
    }
    .history-card:hover .card-text { transform: translateY(0); opacity: 1; }

    /* Shimmer button */
    .btn-primary {
      position: relative; overflow: hidden;
      background: var(--espresso);
      color: var(--cream);
      border: none; cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      letter-spacing: 0.1em;
      font-size: 0.8rem;
      text-transform: uppercase;
      padding: 16px 36px;
      border-radius: 60px;
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .btn-primary::after {
      content: '';
      position: absolute; top: 0; left: -100%;
      width: 55%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(245,237,216,0.1), transparent);
      transform: skewX(-20deg);
      transition: left 0.55s ease;
    }
    .btn-primary:hover { background: var(--roast); box-shadow: 0 12px 40px rgba(28,10,0,0.3); }
    .btn-primary:hover::after { left: 150%; }

    .btn-outline {
      background: transparent;
      color: var(--espresso);
      border: 1.5px solid rgba(28,10,0,0.3);
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      letter-spacing: 0.1em;
      font-size: 0.8rem;
      text-transform: uppercase;
      padding: 15px 36px;
      border-radius: 60px;
      transition: all 0.3s ease;
    }
    .btn-outline:hover {
      background: var(--espresso);
      color: var(--cream);
      border-color: var(--espresso);
    }

    /* Divider line */
    .rule {
      width: 48px; height: 1px;
      background: var(--caramel);
      display: inline-block;
    }

    /* Section label */
    .section-label {
      font-family: 'Outfit', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: var(--caramel);
    }
  `}</style>
);

/* ── SCROLL PROGRESS BAR ────────────────────────────────────── */
function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed", top: 0, left: 0, right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #C17D3C, #3B1A08)",
        transformOrigin: "0%",
        zIndex: 99999,
      }}
    />
  );
}

/* ── DATA ───────────────────────────────────────────────────── */
const content = [
  { url: "/lekhashri-k-cTly5TvGnDU-unsplash.jpg", desc: "Our very first contract — the moment BrewHaven became more than a dream.", year: "2018" },
  { url: "/elin-melaas-ML_mP7oWLRk-unsplash.jpg", desc: "Every sip carries a story. This has always been our north star.", year: "2019" },
  { url: "/anita-jankovic-gAnrjbnRcWM-unsplash.jpg", desc: "We built loyalty one cup at a time. We never stopped.", year: "2020" },
  { url: "/brandon-leclaire-GrWScBV6yg4-unsplash.jpg", desc: "Expansion across three new cities. Trust delivered.", year: "2021" },
  { url: "/pratik-prasad-JnVFfSwLWoc-unsplash.jpg", desc: "Recognised nationally. The work speaks for itself.", year: "2023" },
];

export const products = [
  { name: "Jumping Bean", price: "$24.99", description: "Rich and smooth with deep chocolate notes", image: "/erik-mclean-FL3NmWxw0ok-unsplash.jpg", id: 1, origin: "Colombia" },
  { name: "White Coffee", price: "$19.99", description: "Strong and bold with warm earthy tones", image: "/white-coffee.jpg", id: 2, origin: "Ethiopia" },
  { name: "Feeling 18", price: "$29.99", description: "Floral and citrusy with bright acidity", image: "/lisanto-J73tNVo5oZM-unsplash.jpg", id: 3, origin: "Kenya" },
  { name: "The Good Life", price: "$26.99", description: "Well-balanced with hints of caramel sweetness", image: "/goodlife-coffee.jpg", id: 4, origin: "Brazil" },
  { name: "Happy Coffee", price: "$22.99", description: "Nutty and smooth with a clean low-acid finish", image: "/happy-coffee.jpg", id: 5, origin: "Guatemala" },
];

/* ── STAT STRIP ─────────────────────────────────────────────── */
const stats = [
  { value: "12+", label: "Years Roasting" },
  { value: "5", label: "Premium Blends" },
  { value: "40K+", label: "Happy Customers" },
  { value: "100%", label: "Ethically Sourced" },
];

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const Landing = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  const {
    addToCart, removeFromCart, updateQuantity,
    cart, getTotalItems, success, error, clearCart,
  } = useBasket();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = (id) => addToCart(id);

  return (
    <main className="grain" style={{ minHeight: "100vh", background: "var(--bone)" }}>
      <GlobalStyles />
      <ScrollBar />

      {/* ══ NAVIGATION ══════════════════════════════════════════ */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 1000,
          padding: navScrolled ? "14px 0" : "20px 0",
          background: navScrolled ? "rgba(250,246,239,0.92)" : "transparent",
          backdropFilter: navScrolled ? "blur(18px)" : "none",
          borderBottom: navScrolled ? "1px solid rgba(193,125,60,0.15)" : "none",
          transition: "all 0.4s ease",
          boxShadow: navScrolled ? "0 4px 30px rgba(28,10,0,0.06)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo */}
          <motion.a href="#home" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span className="serif" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--espresso)", letterSpacing: "-0.02em" }}>BrewHaven</span>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.35em", color: "var(--caramel)", textTransform: "uppercase", fontWeight: 600, marginTop: 1 }}>Artisan Coffee Co.</span>
            </div>
          </motion.a>

          {/* Desktop links */}
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", gap: 40, listStyle: "none", alignItems: "center" }}
            className="hidden-mobile">
            {["Home", "About", "Products", "Blog", "Contact"].map((item, i) => (
              <li key={item}>
                <motion.a href={`#${item.toLowerCase()}`} className="nav-link"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}>
                  {item}
                </motion.a>
              </li>
            ))}
          </motion.ul>

          {/* Buttons */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
            style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn-outline hidden-mobile" style={{ padding: "10px 24px", fontSize: "0.72rem" }}>Login</button>
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.72rem" }}>Sign Up</button>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <button style={{
                background: "transparent", border: "1.5px solid rgba(28,10,0,0.15)",
                borderRadius: 60, padding: "9px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                fontSize: "0.8rem", color: "var(--espresso)", fontFamily: "'Outfit', sans-serif",
                transition: "all 0.3s ease",
              }}>
                <MdShoppingCartCheckout size={16} />
                <span style={{ fontWeight: 600, minWidth: 12 }}>{getTotalItems()}</span>
              </button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}
        className="show-mobile">
        <div style={{
          background: "var(--espresso)", borderRadius: "50%", width: 52, height: 52,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 30px rgba(28,10,0,0.35)",
        }}>
          <FullMenu />
        </div>
      </div>

      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none !important; }
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
      `}</style>

      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section id="home" ref={heroRef}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(160deg, var(--bone) 0%, #EDE0CC 55%, #D9C9A8 100%)",
          display: "flex", alignItems: "center",
          position: "relative", overflow: "hidden",
          padding: "0 32px",
        }}>

        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "8%", right: "5%", width: 480, height: 480, borderRadius: "50%", background: "rgba(193,125,60,0.07)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 320, height: 320, borderRadius: "50%", background: "rgba(59,26,8,0.06)", filter: "blur(80px)", pointerEvents: "none" }} />

        {/* Faint grid pattern */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(28,10,0,0.045) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <motion.div style={{ opacity: heroOpacity, maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 64, paddingTop: 60 }}>

          {/* Text column */}
          <div style={{ flex: 1, maxWidth: 620 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
              <span className="rule" />
              <span className="section-label">Est. 2012 · Artisan Roasters</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="serif"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 600, lineHeight: 1.05, color: "var(--espresso)", marginBottom: 28, letterSpacing: "-0.02em" }}>
              Every Cup<br />
              <em style={{ color: "var(--caramel)", fontStyle: "italic" }}>Tells a Story</em>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "rgba(28,10,0,0.6)", maxWidth: 480, marginBottom: 44, fontWeight: 300 }}>
              Sourced from the world's finest farms. Roasted with obsessive care. Delivered to your door so every morning begins with something worth waking up for.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 64 }}>
              <a href="#about" style={{ textDecoration: "none" }}>
                <button className="btn-primary">Discover Our Story</button>
              </a>
              <a href="#products" style={{ textDecoration: "none" }}>
                <button className="btn-outline">Explore Menu</button>
              </a>
            </motion.div>

            {/* Stats strip */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.08 }}>
                  <div className="serif" style={{ fontSize: "2rem", fontWeight: 600, color: "var(--espresso)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: "var(--caramel)", textTransform: "uppercase", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Image column */}
          <motion.div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", y: heroImgY }}
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden-mobile">
            <div style={{ position: "relative" }}>
              {/* Decorative ring */}
              <div style={{
                position: "absolute", inset: -16, borderRadius: "50%",
                border: "1px solid rgba(193,125,60,0.2)",
                animation: "spin 18s linear infinite",
              }} />
              <div style={{
                position: "absolute", inset: -32, borderRadius: "50%",
                border: "1px dashed rgba(193,125,60,0.1)",
                animation: "spin 28s linear infinite reverse",
              }} />
              <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
              <img src="/hero-image.png" alt="BrewHaven Coffee" style={{
                width: "clamp(320px, 40vw, 520px)",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 40px 120px rgba(28,10,0,0.2), 0 0 0 2px rgba(193,125,60,0.15)",
              }} />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(28,10,0,0.35)", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 1, height: 44, background: "linear-gradient(to bottom, var(--caramel), transparent)" }} />
        </motion.div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "var(--bone)", padding: "120px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            style={{ marginBottom: 80 }}>
            <span className="section-label">Who We Are</span>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 24 }}>
              <h2 className="serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: "var(--espresso)", lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: 560 }}>
                Rooted in passion,<br /><em style={{ color: "var(--caramel)" }}>brewed with purpose</em>
              </h2>
              <p style={{ maxWidth: 380, fontSize: "1rem", lineHeight: 1.85, color: "rgba(28,10,0,0.55)", fontWeight: 300 }}>
                BrewHaven was born from a simple belief: that coffee should be more than a beverage. It should be a ritual, a conversation, a moment of presence in a rushing world.
              </p>
            </div>
          </motion.div>

          {/* Image + Text split */}
          <div style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap", marginBottom: 100 }}>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }}
              style={{ flex: "1 1 460px", position: "relative" }}>
              <img src="/pexels-streetwindy-4079749.jpg" alt="About BrewHaven" style={{
                width: "100%", height: 520, objectFit: "cover",
                borderRadius: "48% 40% 36% 52% / 42% 48% 36% 44%",
                boxShadow: "0 32px 80px rgba(28,10,0,0.15)",
              }} />
              {/* Floating badge */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }} viewport={{ once: true }}
                style={{
                  position: "absolute", bottom: 32, right: -16,
                  background: "var(--espresso)", color: "var(--cream)",
                  borderRadius: 20, padding: "20px 28px",
                  boxShadow: "0 16px 50px rgba(28,10,0,0.3)",
                }}>
                <div className="serif" style={{ fontSize: "2.2rem", fontWeight: 700, lineHeight: 1 }}>12+</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4, color: "var(--caramel)" }}>Years of Craft</div>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }} viewport={{ once: true }}
              style={{ flex: "1 1 380px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span className="rule" />
                <span className="section-label">Our Philosophy</span>
              </div>
              <p className="serif" style={{ fontSize: "1.55rem", fontWeight: 400, lineHeight: 1.6, color: "var(--espresso)", marginBottom: 24, letterSpacing: "-0.01em" }}>
                "We believe the best coffee is grown with respect, roasted with patience, and shared with love."
              </p>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.9, color: "rgba(28,10,0,0.55)", fontWeight: 300, marginBottom: 40 }}>
                From single-origin beans carefully selected from partner farms across Colombia, Ethiopia, Kenya, and Brazil — every roast we produce starts with a handshake and ends with a cup worthy of the journey.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Direct trade partnerships with 14 farms", "Carbon-neutral roasting facility", "Zero-waste packaging initiative"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--caramel)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.9rem", color: "rgba(28,10,0,0.65)", fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Brief History — Timeline grid */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
              <span className="rule" />
              <span className="section-label">Our History</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
              {content.map((item, i) => (
                <motion.div key={i} className="history-card"
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }} viewport={{ once: true }}
                  style={{ height: 300 }}>
                  <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                  <div className="overlay" />
                  <div className="card-text">
                    <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--caramel)", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>{item.year}</div>
                    <p style={{ color: "var(--cream)", fontSize: "0.85rem", lineHeight: 1.6, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ PRODUCTS ════════════════════════════════════════════ */}
      <section id="products" style={{
        background: "linear-gradient(180deg, #EDE0CC 0%, var(--bone) 100%)",
        padding: "120px 32px", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: "rgba(193,125,60,0.07)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 400, height: 400, borderRadius: "50%", background: "rgba(59,26,8,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }} viewport={{ once: true }}
            style={{ marginBottom: 72, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
            <div>
              <span className="section-label">Our Selection</span>
              <h2 className="serif" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 600, color: "var(--espresso)", lineHeight: 1.08, letterSpacing: "-0.02em", marginTop: 12 }}>
                The Menu
              </h2>
            </div>
            <p style={{ maxWidth: 360, fontSize: "0.95rem", lineHeight: 1.8, color: "rgba(28,10,0,0.5)", fontWeight: 300 }}>
              Five exceptional blends. Each one a different chapter in the BrewHaven story.
            </p>
          </motion.div>

          {/* Feedback toasts */}
          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: -12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                style={{ background: "var(--espresso)", color: "var(--cream)", padding: "14px 24px", borderRadius: 12, marginBottom: 24, fontSize: "0.85rem", display: "inline-block" }}>
                ✓ Added to cart
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
            {products.map((product, i) => {
              const cartItem = cart.find(item => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <motion.div key={product.id} className="product-card"
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.09 }} viewport={{ once: true }}>

                  {/* Image */}
                  <div style={{ position: "relative", overflow: "hidden", height: 260 }}>
                    <img src={product.image} alt={product.name} style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.6s ease",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(28,10,0,0.35) 0%, transparent 50%)",
                    }} />
                    {/* Price tag */}
                    <div style={{
                      position: "absolute", top: 16, right: 16,
                      background: "var(--espresso)", color: "var(--cream)",
                      padding: "6px 16px", borderRadius: 60,
                      fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.06em",
                    }}>
                      {product.price}
                    </div>
                    {/* Origin tag */}
                    <div style={{
                      position: "absolute", bottom: 16, left: 16,
                      background: "rgba(245,237,216,0.15)", backdropFilter: "blur(8px)",
                      color: "var(--cream)", border: "1px solid rgba(245,237,216,0.25)",
                      padding: "4px 12px", borderRadius: 60,
                      fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase",
                    }}>
                      {product.origin}
                    </div>
                    {quantity > 0 && (
                      <div style={{
                        position: "absolute", top: 16, left: 16,
                        background: "var(--caramel)", color: "#fff",
                        width: 28, height: 28, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.8rem", fontWeight: 700,
                      }}>
                        {quantity}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: "24px 24px 28px", position: "relative", zIndex: 1 }}>
                    <h3 className="serif" style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--espresso)", marginBottom: 6, letterSpacing: "-0.01em" }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "rgba(28,10,0,0.5)", lineHeight: 1.6, marginBottom: 24, fontWeight: 300 }}>
                      {product.description}
                    </p>

                    {/* Qty controls */}
                    {quantity > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <button onClick={() => updateQuantity(product.id, quantity - 1)} style={{
                          width: 30, height: 30, borderRadius: "50%",
                          border: "1.5px solid rgba(28,10,0,0.15)", background: "transparent",
                          cursor: "pointer", fontSize: "1rem", color: "var(--espresso)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>−</button>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, minWidth: 20, textAlign: "center" }}>{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} style={{
                          width: 30, height: 30, borderRadius: "50%",
                          border: "1.5px solid rgba(28,10,0,0.15)", background: "transparent",
                          cursor: "pointer", fontSize: "1rem", color: "var(--espresso)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.2s",
                        }}>+</button>
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn-primary" onClick={() => handleAddToCart(product.id)}
                        style={{ flex: 1, padding: "12px 20px", fontSize: "0.75rem" }}>
                        {quantity > 0 ? "Add More" : "Add to Cart"}
                      </button>
                      {quantity > 0 && (
                        <button onClick={() => removeFromCart(product.id)}
                          style={{
                            padding: "12px 16px", borderRadius: 60,
                            border: "1.5px solid rgba(193,125,60,0.3)",
                            background: "transparent", cursor: "pointer",
                            fontSize: "0.75rem", color: "var(--caramel)",
                            fontFamily: "'Outfit', sans-serif",
                            letterSpacing: "0.06em", transition: "all 0.3s",
                          }}>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cart bar */}
          {cart.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: 56, display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap",
              }}>
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem" }}>
                  <MdShoppingCartCheckout size={18} />
                  View Cart ({getTotalItems()} items)
                </button>
              </Link>
              <button onClick={clearCart} className="btn-outline"
                style={{ fontSize: "0.8rem", color: "rgba(28,10,0,0.45)", borderColor: "rgba(28,10,0,0.15)" }}>
                Clear Cart
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ BLOG ════════════════════════════════════════════════ */}
      <section id="blog" style={{ background: "var(--bone)", padding: "120px 32px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ marginBottom: 56 }}>
            <span className="section-label">From the Roastery</span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 600, color: "var(--espresso)", lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: 10 }}>
              Stories & Craft
            </h2>
          </motion.div>
          <BlogGrid />
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════ */}
      <section id="contact" style={{
        background: "linear-gradient(160deg, var(--espresso) 0%, var(--roast) 100%)",
        padding: "120px 32px",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}
            style={{ marginBottom: 56 }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--caramel)", fontWeight: 600 }}>Get In Touch</span>
            <h2 className="serif" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 600, color: "var(--cream)", lineHeight: 1.1, letterSpacing: "-0.02em", marginTop: 10 }}>
              Let's Talk Coffee
            </h2>
          </motion.div>
          <ContactForm />
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <Footer />
    </main>
  );
};

export default Landing;
