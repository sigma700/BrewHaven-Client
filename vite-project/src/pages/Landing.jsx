import React, {useState, useEffect, useRef} from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {useBasket} from "../store/stateFiles";
import {Link} from "react-router-dom";
import BlogGrid from "./components/blog";
import ContactForm from "./components/contactForm";
import Footer from "./components/footer";
import {FullMenu} from "./components/mobileMenu";
import {MdShoppingCartCheckout} from "react-icons/md";
import {GiBullseye, GiPlantWatering, GiPlasticDuck} from "react-icons/gi";

/* ── GLOBAL STYLES ─────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap');

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
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--caramel); border-radius: 2px; }

    /* Primary display serif — Playfair */
    .serif { font-family: 'Playfair Display', serif; }

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
      color: rgba(28,10,0,0.7);
      font-size: 0.85rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      text-transform: none;
      text-decoration: none;
      transition: color 0.3s;
      font-family: 'Inter', sans-serif;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -3px; left: 0;
      width: 0; height: 2px;
      background: var(--caramel);
      transition: width 0.35s ease;
    }
    .nav-link:hover { color: var(--caramel); }
    .nav-link:hover::after { width: 100%; }

    /* Nav link dark variant (post-hero sections) */
    .nav-link-dark {
      color: var(--espresso) !important;
    }

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
      background: var(--caramel);
      color: var(--ink);
      border: none; cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      letter-spacing: 0.02em;
      font-size: 0.85rem;
      text-transform: none;
      padding: 14px 32px;
      border-radius: 60px;
      transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }
    .btn-primary::after {
      content: '';
      position: absolute; top: 0; left: -100%;
      width: 55%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(245,237,216,0.3), transparent);
      transform: skewX(-20deg);
      transition: left 0.55s ease;
    }
    .btn-primary:hover {
      background: var(--cream);
      color: var(--ink);
      box-shadow: 0 12px 40px rgba(193,125,60,0.4);
      transform: translateY(-2px);
    }
    .btn-primary:hover::after { left: 150%; }

    /* Dark variant for non-hero sections */
    .btn-primary-dark {
      background: var(--espresso) !important;
      color: var(--cream) !important;
    }
    .btn-primary-dark:hover {
      background: var(--roast) !important;
      color: var(--cream) !important;
      box-shadow: 0 12px 40px rgba(28,10,0,0.3) !important;
    }

    .btn-outline {
      background: transparent;
      color: var(--espresso);
      border: 1.5px solid rgba(28,10,0,0.3);
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      letter-spacing: 0.02em;
      font-size: 0.85rem;
      text-transform: none;
      padding: 13px 32px;
      border-radius: 60px;
      transition: all 0.3s ease;
    }
    .btn-outline:hover {
      background: var(--espresso);
      color: var(--cream);
      border-color: var(--espresso);
    }

    .btn-ghost-light {
      background: transparent;
      color: var(--cream);
      border: 1px solid rgba(245,237,216,0.35);
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      letter-spacing: 0.02em;
      font-size: 0.85rem;
      text-transform: none;
      padding: 14px 32px;
      border-radius: 60px;
      transition: all 0.3s ease;
    }
    .btn-ghost-light:hover {
      border-color: var(--caramel);
      color: var(--caramel);
    }

    /* Section label — refined, no leading dash/rule */
    .section-label {
      font-family: 'Inter', sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--caramel);
      position: relative;
      padding-bottom: 10px;
      display: inline-block;
    }
    .section-label::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0;
      width: 28px; height: 2px;
      background: var(--caramel);
      border-radius: 2px;
    }
    .section-label-center {
      text-align: center;
      display: block;
    }
    .section-label-center::after {
      left: 50%;
      transform: translateX(-50%);
    }
    .section-label-light {
      color: var(--caramel);
    }

    /* Hero video */
    .hero-video-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }

    /* Avatar trust group */
    .avatar-stack {
      display: flex;
      align-items: center;
    }
    .avatar-stack img {
      width: 38px; height: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--ink);
      margin-left: -10px;
    }
    .avatar-stack img:first-child { margin-left: 0; }

    @keyframes scrollPulse {
      0%, 100% { transform: scaleY(1); opacity: 1; }
      50%       { transform: scaleY(0.65); opacity: 0.35; }
    }
  `}</style>
);

/* ── SCROLL PROGRESS BAR ────────────────────────────────────── */
function ScrollBar() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 100, damping: 30});
  return (
    <motion.div
      style={{
        scaleX,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
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
  {
    url: "/lekhashri-k-cTly5TvGnDU-unsplash.jpg",
    desc: "Our very first contract — the moment BrewHaven became more than a dream.",
    year: "2018",
  },
  {
    url: "/elin-melaas-ML_mP7oWLRk-unsplash.jpg",
    desc: "Every sip carries a story. This has always been our north star.",
    year: "2019",
  },
  {
    url: "/anita-jankovic-gAnrjbnRcWM-unsplash.jpg",
    desc: "We built loyalty one cup at a time. We never stopped.",
    year: "2020",
  },
  {
    url: "/brandon-leclaire-GrWScBV6yg4-unsplash.jpg",
    desc: "Expansion across three new cities. Trust delivered.",
    year: "2021",
  },
  {
    url: "/pratik-prasad-JnVFfSwLWoc-unsplash.jpg",
    desc: "Recognised nationally. The work speaks for itself.",
    year: "2023",
  },
];

export const products = [
  {
    name: "Jumping Bean",
    price: "$24.99",
    description: "Rich and smooth with deep chocolate notes",
    image: "/erik-mclean-FL3NmWxw0ok-unsplash.jpg",
    id: 1,
    origin: "Colombia",
  },
  {
    name: "White Coffee",
    price: "$19.99",
    description: "Strong and bold with warm earthy tones",
    image: "/white-coffee.jpg",
    id: 2,
    origin: "Ethiopia",
  },
  {
    name: "Feeling 18",
    price: "$29.99",
    description: "Floral and citrusy with bright acidity",
    image: "/lisanto-J73tNVo5oZM-unsplash.jpg",
    id: 3,
    origin: "Kenya",
  },
  {
    name: "The Good Life",
    price: "$26.99",
    description: "Well-balanced with hints of caramel sweetness",
    image: "/goodlife-coffee.jpg",
    id: 4,
    origin: "Brazil",
  },
  {
    name: "Happy Coffee",
    price: "$22.99",
    description: "Nutty and smooth with a clean low-acid finish",
    image: "/happy-coffee.jpg",
    id: 5,
    origin: "Guatemala",
  },
];

const stats = [
  {value: "12+", label: "Years Roasting"},
  {value: "5", label: "Premium Blends"},
  {value: "40K+", label: "Happy Customers"},
  {value: "100%", label: "Ethically Sourced"},
];

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const Landing = () => {
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef(null);
  const {scrollYProgress: heroProgress} = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);

  const {
    addToCart,
    removeFromCart,
    updateQuantity,
    cart,
    getTotalItems,
    success,
    error,
    clearCart,
  } = useBasket();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = (id) => addToCart(id);

  return (
    <main
      className="grain"
      style={{minHeight: "100vh", background: "var(--bone)"}}
    >
      <GlobalStyles />
      <ScrollBar />

      {/* ══ NAVIGATION ══════════════════════════════════════════ */}
      <style>{`
        /* ── NAV LINK: liquid ink fill on hover ── */
        .nav-ink {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem; font-weight: 500;
          letter-spacing: 0.02em; text-transform: none;
          text-decoration: none;
          padding: 4px 0;
          display: inline-block;
          overflow: hidden;
        }
        .nav-ink .ink-top {
          position: absolute; inset: 0;
          display: flex; align-items: center;
          color: var(--caramel);
          clip-path: inset(100% 0 0 0);
          transition: clip-path 0.45s cubic-bezier(0.76, 0, 0.24, 1);
          white-space: nowrap;
        }
        .nav-ink .ink-base {
          display: block;
          transition: color 0.3s ease;
        }
        .nav-ink:hover .ink-top {
          clip-path: inset(0% 0 0 0);
        }

        .nav-logo-name {
          display: inline-block;
          transition: letter-spacing 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      color 0.4s ease;
        }
        .nav-logo-wrap:hover .nav-logo-name {
          letter-spacing: 0.02em !important;
        }

        .nav-cart-btn {
          position: relative; overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.3s ease,
                      border-color 0.3s ease, background 0.3s ease;
        }
        .nav-cart-btn:hover {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 8px 24px rgba(193,125,60,0.22);
        }
        .nav-cart-btn:active { transform: translateY(0) scale(0.96); }

        @keyframes cartPing {
          0%   { transform: scale(1); opacity: 1; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .cart-ping {
          position: absolute; inset: 0;
          border-radius: inherit;
          border: 1.5px solid var(--caramel);
          animation: cartPing 1.6s ease-out infinite;
          pointer-events: none;
        }

        .nav-action-btn {
          position: relative; overflow: hidden;
          cursor: pointer;
          transition: color 0.3s ease, background 0.3s ease,
                      border-color 0.3s ease, transform 0.3s ease;
        }
        .nav-action-btn::before {
          content: '';
          position: absolute; top: 0; left: -120%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent,
            rgba(193,125,60,0.18), transparent);
          transform: skewX(-20deg);
          transition: left 0s;
        }
        .nav-action-btn:hover::before {
          left: 160%;
          transition: left 0.55s ease;
        }
        .nav-action-btn:hover { transform: translateY(-2px); }

        .nav-bar-inner::after {
          content: '';
          position: absolute; bottom: 0; left: 50%;
          width: 0; height: 1px;
          background: linear-gradient(to right,
            transparent, rgba(193,125,60,0.45), transparent);
          transform: translateX(-50%);
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }
        .nav-bar-inner:hover::after { width: 80%; }

        .nav-transition {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: navScrolled ? "12px 0" : "24px 0",
          background: navScrolled
            ? "rgba(250,246,239,0.98)"
            : "rgba(14,6,1,0.85)",
          backdropFilter: navScrolled ? "blur(20px)" : "blur(12px)",
          borderBottom: navScrolled
            ? "1px solid rgba(193,125,60,0.15)"
            : "1px solid rgba(245,237,216,0.1)",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: navScrolled ? "0 8px 32px rgba(28,10,0,0.08)" : "none",
        }}
        className="nav-transition"
      >
        <div
          className="nav-bar-inner"
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* ── LOGO ── */}
          <motion.a
            href="#home"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.6}}
            style={{textDecoration: "none"}}
            className="nav-logo-wrap"
          >
            <div
              style={{display: "flex", flexDirection: "column", lineHeight: 1}}
            >
              <span
                className="serif nav-logo-name"
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: navScrolled ? "var(--espresso)" : "var(--cream)",
                  transition: "color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                BrewHaven
              </span>
              <motion.span
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--caramel)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginTop: 2,
                  fontFamily: "'Inter', sans-serif",
                  display: "block",
                  opacity: navScrolled ? 0.8 : 1,
                  transition: "opacity 0.4s ease",
                }}
              >
                Artisan Coffee Co.
              </motion.span>
            </div>
          </motion.a>

          {/* ── DESKTOP NAV LINKS ── */}
          <motion.ul
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.2}}
            style={{
              display: "flex",
              gap: 40,
              listStyle: "none",
              alignItems: "center",
            }}
            className="hidden-mobile"
          >
            {["Home", "About", "Products", "Blog", "Contact"].map((item, i) => (
              <motion.li
                key={item}
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                transition={{
                  delay: 0.1 * i + 0.3,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <a href={`#${item.toLowerCase()}`} className="nav-ink">
                  <span
                    className="ink-base"
                    style={{
                      color: navScrolled
                        ? "var(--espresso)"
                        : "rgba(245,237,216,0.85)",
                      transition: "color 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {item}
                  </span>
                  <span className="ink-top" aria-hidden="true">
                    {item}
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* ── BUTTONS ── */}
          <motion.div
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 0.4}}
            style={{display: "flex", gap: 12, alignItems: "center"}}
          >
            <button
              className="nav-action-btn hidden-mobile"
              style={{
                background: navScrolled
                  ? "transparent"
                  : "rgba(255,255,255,0.08)",
                border: navScrolled
                  ? "1px solid rgba(28,10,0,0.2)"
                  : "1px solid rgba(245,237,216,0.3)",
                color: navScrolled ? "var(--espresso)" : "var(--cream)",
                padding: "10px 24px",
                borderRadius: 60,
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.02em",
                textTransform: "none",
                fontWeight: 500,
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                cursor: "pointer",
              }}
            >
              Login
            </button>

            <button
              className="nav-action-btn"
              style={{
                padding: "10px 24px",
                fontSize: "0.8rem",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.02em",
                borderRadius: 60,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                ...(navScrolled
                  ? {
                      background: "var(--espresso)",
                      color: "var(--cream)",
                      border: "none",
                    }
                  : {
                      background: "var(--caramel)",
                      color: "var(--espresso)",
                      border: "none",
                    }),
              }}
            >
              Sign Up
            </button>

            <Link to="/cart" style={{textDecoration: "none"}}>
              <button
                className="nav-cart-btn"
                style={{
                  position: "relative",
                  background: navScrolled
                    ? "transparent"
                    : "rgba(255,255,255,0.08)",
                  border: navScrolled
                    ? "1.5px solid rgba(28,10,0,0.15)"
                    : "1.5px solid rgba(245,237,216,0.25)",
                  borderRadius: 60,
                  padding: "9px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.85rem",
                  color: navScrolled ? "var(--espresso)" : "var(--cream)",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {getTotalItems() > 0 && <span className="cart-ping" />}
                <MdShoppingCartCheckout size={18} />
                <span style={{fontWeight: 600, minWidth: 12}}>
                  {getTotalItems()}
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        style={{position: "fixed", bottom: 24, right: 24, zIndex: 999}}
        className="show-mobile"
      >
        <div
          style={{
            background: "var(--espresso)",
            borderRadius: "50%",
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 30px rgba(28,10,0,0.35)",
          }}
        >
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

      {/* ══ HERO — VIDEO BACKGROUND ══════════════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          background: "#0E0601",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600;6..96,700;6..96,800;6..96,900&display=swap');

          .hero-headline {
            font-family: 'Bodoni Moda', serif !important;
          }

          .hero-subhead {
            font-family: 'Bodoni Moda', serif !important;
            font-weight: 400 !important;
          }

          .hero-stats {
            font-family: 'Bodoni Moda', serif !important;
          }

          @media (max-width: 1024px) {
            .hero-stats-strip { display: none !important; }
            .hero-trust-mobile { display: flex !important; }
          }
          .hero-trust-mobile { display: none; }
        `}</style>

        <video
          className="hero-video-bg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
        >
          <source src="/final_stock.mp4" type="video/mp4" />
        </video>

        {/* ── Cinematic overlay layers ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(135deg, rgba(14,6,1,0.85) 0%, rgba(14,6,1,0.5) 50%, rgba(14,6,1,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            background:
              "linear-gradient(to top, rgba(14,6,1,0.6) 0%, transparent 50%)",
          }}
        />

        {/* ── Hero content ── */}
        <motion.div
          style={{
            opacity: heroOpacity,
            maxWidth: 1280,
            margin: "0 auto",
            width: "100%",
            paddingTop: 60,
            position: "relative",
            zIndex: 5,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.7}}
            style={{
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--caramel)",
                fontWeight: 600,
              }}
            >
              Artisan Roasters
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1]}}
            className="hero-headline"
            style={{
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "var(--cream)",
              marginBottom: 28,
              letterSpacing: "-0.01em",
              maxWidth: 680,
              fontStyle: "normal",
            }}
          >
            Every Cup
            <br />
            <span
              style={{
                color: "var(--caramel)",
                fontStyle: "italic",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Tells a Story
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.35, duration: 0.7}}
            className="hero-subhead"
            style={{
              fontSize: "1.15rem",
              lineHeight: 1.7,
              color: "rgba(245,237,216,0.8)",
              maxWidth: 520,
              marginBottom: 48,
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}
          >
            Sourced from the world's finest farms. Roasted with obsessive care.
            Delivered to your door so every morning begins with something worth
            waking up for.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5}}
            style={{
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              marginBottom: 80,
            }}
          >
            <a href="#about" style={{textDecoration: "none"}}>
              <button className="btn-primary">Discover Our Story</button>
            </a>
            <a href="#products" style={{textDecoration: "none"}}>
              <button className="btn-ghost-light">Explore Menu</button>
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="hero-stats-strip"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.75}}
            style={{display: "flex", gap: 56, flexWrap: "wrap"}}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.75 + i * 0.08}}
              >
                <div
                  className="hero-stats"
                  style={{
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    color: "var(--cream)",
                    lineHeight: 1,
                    fontFamily: "'Bodoni Moda', serif",
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    color: "var(--caramel)",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginTop: 8,
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1.5}}
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            zIndex: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "rgba(245,237,216,0.4)",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 2,
              height: 56,
              background:
                "linear-gradient(to bottom, var(--caramel), transparent)",
              animation: "scrollPulse 1.9s ease-in-out infinite",
            }}
          />
        </motion.div>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════════ */}
      <section
        id="about"
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, var(--bone) 100%)",
          padding: "140px 32px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--caramel), transparent)",
            opacity: 0.3,
          }}
        />

        <div style={{maxWidth: 1280, margin: "0 auto", position: "relative"}}>
          {/* Section Header */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.7}}
            viewport={{once: true}}
            style={{marginBottom: 100, textAlign: "center"}}
          >
            <span
              className="section-label section-label-center"
              style={{marginBottom: 24}}
            >
              Welcome to BrewHaven
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 600,
                color: "var(--espresso)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginBottom: 24,
                marginTop: 28,
              }}
            >
              Rooted in passion,
              <br />
              <span style={{color: "var(--caramel)", fontStyle: "italic"}}>
                brewed with purpose
              </span>
            </h2>
            <p
              style={{
                maxWidth: 680,
                margin: "0 auto",
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "rgba(28,10,0,0.55)",
                fontWeight: 400,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              BrewHaven was born from a simple belief: that coffee should be
              more than a beverage. It should be a ritual, a conversation, a
              moment of presence in a rushing world.
            </p>
          </motion.div>

          {/* Premium Image + Text section */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
              marginBottom: 120,
              position: "relative",
            }}
            className="about-premium-grid"
          >
            {/* Left Column - Image */}
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
              viewport={{once: true}}
              style={{position: "relative"}}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 40px 60px -20px rgba(28,10,0,0.25)",
                }}
              >
                <img
                  src="/pexels-streetwindy-4079749.jpg"
                  alt="About BrewHaven"
                  style={{
                    width: "100%",
                    height: "580px",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="about-image"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>

              <div
                style={{
                  position: "absolute",
                  top: -20,
                  left: -20,
                  width: 80,
                  height: 80,
                  borderTop: "2px solid var(--caramel)",
                  borderLeft: "2px solid var(--caramel)",
                  opacity: 0.3,
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
              viewport={{once: true}}
            >
              <div style={{marginBottom: 40}}>
                <span className="section-label" style={{marginBottom: 28}}>
                  Our Philosophy
                </span>

                <div
                  className="serif"
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    color: "var(--espresso)",
                    marginBottom: 32,
                    marginTop: 28,
                    letterSpacing: "-0.01em",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontSize: "3rem",
                      color: "var(--caramel)",
                      opacity: 0.3,
                      position: "absolute",
                      top: -10,
                      left: -20,
                      fontFamily: "serif",
                    }}
                  >
                    "
                  </span>
                  We believe the best coffee is grown with respect, roasted with
                  patience, and shared with love.
                  <span
                    style={{
                      fontSize: "3rem",
                      color: "var(--caramel)",
                      opacity: 0.3,
                      position: "relative",
                      bottom: -20,
                      right: -10,
                      fontFamily: "serif",
                    }}
                  >
                    "
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.8,
                    color: "rgba(28,10,0,0.6)",
                    fontWeight: 400,
                    marginBottom: 36,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  From single-origin beans carefully selected from partner farms
                  across Colombia, Ethiopia, Kenya, and Brazil, every roast we
                  produce starts with a handshake and ends with a cup worthy of
                  the journey.
                </p>
              </div>

              {/* Premium features list */}
              <div style={{display: "flex", flexDirection: "column", gap: 20}}>
                {[
                  {
                    icon: <GiPlantWatering />,
                    text: "Direct trade partnerships with 14 farms",
                    desc: "Building lasting relationships with growers",
                  },
                  {
                    icon: <GiPlasticDuck />,
                    text: "Carbon-neutral roasting facility",
                    desc: "Committed to sustainable practices",
                  },
                  {
                    icon: <GiBullseye />,
                    text: "Zero-waste packaging initiative",
                    desc: "Eco-friendly from bean to cup",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{opacity: 0, x: 20}}
                    whileInView={{opacity: 1, x: 0}}
                    transition={{delay: 0.4 + idx * 0.1}}
                    viewport={{once: true}}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      padding: "16px 20px",
                      background: "white",
                      borderRadius: "16px",
                      border: "1px solid rgba(193,125,60,0.08)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      borderColor: "rgba(193,125,60,0.2)",
                      boxShadow: "0 8px 20px rgba(28,10,0,0.06)",
                      x: 5,
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.8rem",
                        minWidth: 48,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{flex: 1}}>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "var(--espresso)",
                          marginBottom: 4,
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {item.text}
                      </div>
                      <div
                        style={{
                          fontSize: "0.85rem",
                          color: "rgba(28,10,0,0.5)",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* History timeline grid */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            viewport={{once: true}}
            style={{marginBottom: 40}}
          >
            <div style={{marginBottom: 48}}>
              <span className="section-label">Our History</span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 16,
              }}
            >
              {content.map((item, i) => (
                <motion.div
                  key={i}
                  className="history-card"
                  initial={{opacity: 0, y: 30}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.55, delay: i * 0.08}}
                  viewport={{once: true}}
                  style={{height: 300}}
                >
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.06)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div className="overlay" />
                  <div className="card-text">
                    <div
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.15em",
                        color: "var(--caramel)",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 8,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.year}
                    </div>
                    <p
                      style={{
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        fontWeight: 400,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 968px) {
            .about-premium-grid {
              grid-template-columns: 1fr !important;
              gap: 60px !important;
            }
            .about-image {
              height: 450px !important;
            }
          }

          @media (max-width: 640px) {
            .about-image {
              height: 350px !important;
            }
          }
        `}</style>
      </section>

      {/* ══ PRODUCTS ════════════════════════════════════════════ */}
      <section
        id="products"
        style={{
          background: "linear-gradient(180deg, #EDE0CC 0%, var(--bone) 100%)",
          padding: "120px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{maxWidth: 1280, margin: "0 auto", position: "relative"}}>
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.7}}
            viewport={{once: true}}
            style={{
              marginBottom: 72,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <span className="section-label">Our Selection</span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 600,
                  color: "var(--espresso)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginTop: 20,
                }}
              >
                The Menu
              </h2>
            </div>
            <p
              style={{
                maxWidth: 380,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                color: "rgba(28,10,0,0.55)",
                fontWeight: 400,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Five exceptional blends. Each one a different chapter in the
              BrewHaven story.
            </p>
          </motion.div>

          {/* Feedback toast */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{opacity: 0, y: -12, scale: 0.97}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0}}
                style={{
                  background: "var(--espresso)",
                  color: "var(--cream)",
                  padding: "14px 24px",
                  borderRadius: 12,
                  marginBottom: 24,
                  fontSize: "0.85rem",
                  display: "inline-block",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                ✓ Added to cart
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 28,
            }}
          >
            {products.map((product, i) => {
              const cartItem = cart.find((item) => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{opacity: 0, y: 40}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.6, delay: i * 0.09}}
                  viewport={{once: true}}
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      height: 260,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.6s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.07)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(28,10,0,0.35) 0%, transparent 50%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        background: "var(--espresso)",
                        color: "var(--cream)",
                        padding: "6px 16px",
                        borderRadius: 60,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        letterSpacing: "0.02em",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {product.price}
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        background: "rgba(245,237,216,0.15)",
                        backdropFilter: "blur(8px)",
                        color: "var(--cream)",
                        border: "1px solid rgba(245,237,216,0.25)",
                        padding: "4px 12px",
                        borderRadius: 60,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {product.origin}
                    </div>
                    {quantity > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          background: "var(--caramel)",
                          color: "#fff",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                        }}
                      >
                        {quantity}
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div
                    style={{
                      padding: "24px 24px 28px",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <h3
                      className="serif"
                      style={{
                        fontSize: "1.4rem",
                        fontWeight: 600,
                        color: "var(--espresso)",
                        marginBottom: 8,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "rgba(28,10,0,0.55)",
                        lineHeight: 1.6,
                        marginBottom: 24,
                        fontWeight: 400,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {product.description}
                    </p>

                    {quantity > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 16,
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(28,10,0,0.15)",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            color: "var(--espresso)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            minWidth: 24,
                            textAlign: "center",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            border: "1.5px solid rgba(28,10,0,0.15)",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "1.1rem",
                            color: "var(--espresso)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s",
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}

                    <div style={{display: "flex", gap: 10}}>
                      <button
                        className="btn-primary btn-primary-dark"
                        onClick={() => handleAddToCart(product.id)}
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {quantity > 0 ? "Add More" : "Add to Cart"}
                      </button>
                      {quantity > 0 && (
                        <button
                          onClick={() => removeFromCart(product.id)}
                          style={{
                            padding: "12px 18px",
                            borderRadius: 60,
                            border: "1.5px solid rgba(193,125,60,0.3)",
                            background: "transparent",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            color: "var(--caramel)",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.02em",
                            transition: "all 0.3s",
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
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
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              style={{
                marginTop: 56,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <Link to="/cart" style={{textDecoration: "none"}}>
                <button
                  className="btn-primary btn-primary-dark"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: "0.9rem",
                  }}
                >
                  <MdShoppingCartCheckout size={18} />
                  View Cart ({getTotalItems()} items)
                </button>
              </Link>
              <button
                onClick={clearCart}
                className="btn-outline"
                style={{
                  fontSize: "0.85rem",
                  color: "rgba(28,10,0,0.5)",
                  borderColor: "rgba(28,10,0,0.2)",
                }}
              >
                Clear Cart
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══ BLOG ════════════════════════════════════════════════ */}
      <section
        id="blog"
        style={{background: "var(--bone)", padding: "120px 32px 80px"}}
      >
        <div style={{maxWidth: 1280, margin: "0 auto"}}>
          <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            viewport={{once: true}}
            style={{marginBottom: 56}}
          >
            <span className="section-label">From the Roastery</span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 600,
                color: "var(--espresso)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginTop: 20,
              }}
            >
              Stories &amp; Craft
            </h2>
          </motion.div>
          <BlogGrid />
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          background:
            "linear-gradient(160deg, var(--espresso) 0%, var(--roast) 100%)",
          padding: "120px 32px",
        }}
      >
        <div style={{maxWidth: 1280, margin: "0 auto"}}>
          <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            viewport={{once: true}}
            style={{marginBottom: 56}}
          >
            <span
              className="section-label section-label-light"
              style={{fontSize: "0.75rem", letterSpacing: "0.22em"}}
            >
              Get In Touch
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 600,
                color: "var(--cream)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                marginTop: 20,
              }}
            >
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
