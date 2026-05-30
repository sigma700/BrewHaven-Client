import React from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {FiFacebook, FiInstagram, FiLinkedin, FiTwitter} from "react-icons/fi";
import {FaLocationDot} from "react-icons/fa6";
import {CiHeadphones, CiMail} from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,300;1,400&family=Josefin+Sans:wght@300;400;600&display=swap');

        .ft-root {
          position: relative;
          background: linear-gradient(170deg, #1C0A00 0%, #0E0601 60%, #160700 100%);
          color: var(--cream, #F5EDD8);
          font-family: 'Josefin Sans', sans-serif;
          overflow: hidden;
        }

        /* Grain */
        .ft-root::before {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none; z-index: 0;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px;
        }

        /* Top separator wave */
        .ft-wave {
          position: absolute; top: 0; left: 0; right: 0;
          line-height: 0; pointer-events: none; z-index: 1;
        }

        /* Ambient glows */
        .ft-glow-left {
          position: absolute;
          bottom: -80px; left: -80px;
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(193,125,60,0.1) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .ft-glow-right {
          position: absolute;
          top: -40px; right: -60px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(59,26,8,0.35) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* Horizontal rule */
        .ft-rule {
          width: 40px; height: 1px;
          background: #C17D3C;
          display: inline-block;
        }

        /* Column heading */
        .ft-col-label {
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.58rem; letter-spacing: 0.34em;
          text-transform: uppercase; color: #C17D3C;
          font-weight: 600; display: block; margin-bottom: 8px;
        }
        .ft-col-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 600;
          color: #F5EDD8; letter-spacing: -0.01em;
          margin-bottom: 28px;
        }

        /* Nav links */
        .ft-link {
          display: flex; align-items: center; gap: 12px;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.82rem; font-weight: 300;
          letter-spacing: 0.06em;
          color: rgba(245,237,216,0.5);
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 4px 0;
        }
        .ft-link:hover { color: #C17D3C; }
        .ft-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #C17D3C; flex-shrink: 0;
          opacity: 0.6; transition: opacity 0.3s;
        }
        .ft-link:hover .ft-link-dot { opacity: 1; }

        /* Social buttons */
        .ft-social {
          width: 38px; height: 38px; border-radius: 50%;
          border: 1px solid rgba(193,125,60,0.25);
          background: rgba(193,125,60,0.06);
          display: flex; align-items: center; justify-content: center;
          color: rgba(245,237,216,0.5);
          text-decoration: none; font-size: 0.95rem;
          transition: all 0.3s ease; cursor: pointer;
        }
        .ft-social:hover {
          border-color: #C17D3C;
          background: rgba(193,125,60,0.15);
          color: #C17D3C;
          transform: translateY(-3px);
        }

        /* Contact items */
        .ft-contact-item {
          display: flex; align-items: flex-start; gap: 14px;
        }
        .ft-contact-icon {
          width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid rgba(193,125,60,0.2);
          background: rgba(193,125,60,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #C17D3C; font-size: 0.9rem; flex-shrink: 0;
        }
        .ft-contact-text {
          font-size: 0.82rem; font-weight: 300;
          color: rgba(245,237,216,0.5);
          letter-spacing: 0.04em; line-height: 1.6;
          padding-top: 6px;
        }

        /* Newsletter */
        .ft-newsletter-input {
          flex: 1;
          padding: 12px 16px;
          background: rgba(245,237,216,0.04);
          border: 1px solid rgba(193,125,60,0.2);
          border-right: none;
          border-radius: 60px 0 0 60px;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.78rem; font-weight: 300;
          letter-spacing: 0.06em;
          color: #F5EDD8;
          outline: none;
          transition: border-color 0.3s;
        }
        .ft-newsletter-input::placeholder { color: rgba(245,237,216,0.22); }
        .ft-newsletter-input:focus { border-color: rgba(193,125,60,0.5); }
        .ft-newsletter-btn {
          padding: 12px 22px;
          background: #C17D3C;
          border: none; cursor: pointer;
          border-radius: 0 60px 60px 0;
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.68rem; letter-spacing: 0.2em;
          text-transform: uppercase; font-weight: 600;
          color: #0E0601;
          transition: background 0.3s ease;
        }
        .ft-newsletter-btn:hover { background: #F5EDD8; }

        /* Divider */
        .ft-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(193,125,60,0.2) 30%, rgba(193,125,60,0.2) 70%, transparent);
          margin: 0;
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex; justify-content: space-between;
          align-items: center; flex-wrap: wrap; gap: 20px;
          padding: 28px 0;
        }
        .ft-copy {
          font-size: 0.7rem; letter-spacing: 0.1em;
          color: rgba(245,237,216,0.28); font-weight: 300;
        }
        .ft-legal {
          display: flex; gap: 28px; flex-wrap: wrap;
        }
        .ft-legal a {
          font-family: 'Josefin Sans', sans-serif;
          font-size: 0.65rem; letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(245,237,216,0.28);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .ft-legal a:hover { color: #C17D3C; }
        .ft-credit {
          font-size: 0.68rem; letter-spacing: 0.06em;
          color: rgba(245,237,216,0.25); font-weight: 300;
        }
        .ft-credit span {
          color: #C17D3C; font-weight: 600;
        }

        /* Decorative large text */
        .ft-watermark {
          position: absolute;
          bottom: -10px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem);
          font-weight: 700; font-style: italic;
          color: rgba(193,125,60,0.04);
          white-space: nowrap;
          pointer-events: none; z-index: 0;
          letter-spacing: -0.03em;
          line-height: 1;
          user-select: none;
        }

        @media (max-width: 900px) {
          .ft-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr !important; }
          .ft-bottom { flex-direction: column; text-align: center; }
          .ft-legal { justify-content: center; }
        }
      `}</style>

      <footer className="ft-root">
        {/* Ambient glows */}
        <div className="ft-glow-left" />
        <div className="ft-glow-right" />

        {/* Watermark */}
        <div className="ft-watermark">BrewHaven</div>

        {/* Thin top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(193,125,60,0.35) 35%, rgba(193,125,60,0.35) 65%, transparent)",
            zIndex: 2,
          }}
        />

        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 48px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* ── MAIN GRID ── */}
          <div
            className="ft-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr 1.4fr",
              gap: 48,
              padding: "72px 0 64px",
            }}
          >
            {/* ── BRAND COLUMN ── */}
            <motion.div
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              viewport={{once: true}}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  marginBottom: 24,
                }}
              >
                <div style={{lineHeight: 1}}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#F5EDD8",
                      letterSpacing: "-0.02em",
                      display: "block",
                    }}
                  >
                    BrewHaven
                  </span>
                  <span
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontSize: "0.5rem",
                      letterSpacing: "0.38em",
                      color: "#C17D3C",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      marginTop: 3,
                      display: "block",
                    }}
                  >
                    Artisan Coffee Co.
                  </span>
                </div>
              </Link>

              {/* Divider rule */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span className="ft-rule" />
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.28em",
                    color: "#C17D3C",
                    textTransform: "uppercase",
                    fontWeight: 600,
                  }}
                >
                  Est. 2012
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: "0.85rem",
                  lineHeight: 1.85,
                  color: "rgba(245,237,216,0.45)",
                  fontWeight: 300,
                  letterSpacing: "0.03em",
                  marginBottom: 32,
                }}
              >
                Crafting exceptional coffee experiences since 2012. We source
                the finest beans from around the world — roasted with obsessive
                care, delivered with love.
              </p>

              {/* Social icons */}
              <div style={{display: "flex", gap: 10}}>
                {[
                  {icon: <FiFacebook size={15} />, href: "#"},
                  {icon: <FiTwitter size={15} />, href: "#"},
                  {icon: <FiInstagram size={15} />, href: "#"},
                  {icon: <FiLinkedin size={15} />, href: "#"},
                ].map(({icon, href}, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="ft-social"
                    whileHover={{y: -3}}
                    transition={{type: "spring", stiffness: 300}}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── QUICK LINKS ── */}
            <motion.div
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.1}}
              viewport={{once: true}}
            >
              <span className="ft-col-label">Navigate</span>
              <h3 className="ft-col-heading">Quick Links</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {["Home", "About", "Products", "Blog", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <Link to={`/#${link.toLowerCase()}`} className="ft-link">
                        <span className="ft-link-dot" />
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </motion.div>

            {/* ── PRODUCTS ── */}
            <motion.div
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2}}
              viewport={{once: true}}
            >
              <span className="ft-col-label">Our Selection</span>
              <h3 className="ft-col-heading">The Menu</h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {[
                  "Jumping Bean Blend",
                  "White Coffee Premium",
                  "Feeling 18 Roast",
                  "The Good Life Blend",
                  "Happy Coffee",
                ].map((product) => (
                  <li key={product}>
                    <a href="/#products" className="ft-link">
                      <span className="ft-link-dot" />
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ── CONTACT + NEWSLETTER ── */}
            <motion.div
              initial={{opacity: 0, y: 24}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.3}}
              viewport={{once: true}}
            >
              <span className="ft-col-label">Reach Us</span>
              <h3 className="ft-col-heading">Get In Touch</h3>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {[
                  {
                    icon: <FaLocationDot size={13} />,
                    text: "72 W 38th St, New York",
                  },
                  {icon: <CiHeadphones size={14} />, text: "+1 (555) 123-BREW"},
                  {icon: <CiMail size={14} />, text: "business@brewhaven.com"},
                ].map(({icon, text}) => (
                  <div key={text} className="ft-contact-item">
                    <div className="ft-contact-icon">{icon}</div>
                    <span className="ft-contact-text">{text}</span>
                  </div>
                ))}
              </div>

              {/* Newsletter */}
              <div>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#C17D3C",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  Newsletter
                </span>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(245,237,216,0.4)",
                    fontWeight: 300,
                    letterSpacing: "0.03em",
                    lineHeight: 1.65,
                    marginBottom: 14,
                  }}
                >
                  Roast notes, origin stories & exclusive drops.
                </p>
                <div style={{display: "flex"}}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="ft-newsletter-input"
                  />
                  <motion.button
                    className="ft-newsletter-btn"
                    whileTap={{scale: 0.96}}
                  >
                    Join
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="ft-divider" />

          {/* ── BOTTOM BAR ── */}
          <motion.div
            className="ft-bottom"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 0.6, delay: 0.4}}
            viewport={{once: true}}
          >
            <p className="ft-copy">
              &copy; {currentYear} BrewHaven Coffee Co. All rights reserved.
            </p>

            <nav className="ft-legal">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Shipping Policy",
              ].map((link) => (
                <a key={link} href="#">
                  {link}
                </a>
              ))}
            </nav>

            <p className="ft-credit">
              Crafted with ♥ by <span>Allan Muriithi Kirimi</span>
            </p>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
