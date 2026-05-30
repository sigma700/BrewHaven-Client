import React, {useState, useRef, useEffect} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {BsCupHot} from "react-icons/bs";
import {FaRegQuestionCircle} from "react-icons/fa";
import {VscFeedback} from "react-icons/vsc";
import {FaHandshakeSimple} from "react-icons/fa6";

/* ── STYLES ─────────────────────────────────────────────────── */
const ContactStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,300;1,400;1,600&family=Josefin+Sans:wght@300;400;600&display=swap');

    :root {
      --espresso: #1C0A00;
      --roast:    #3B1A08;
      --caramel:  #C17D3C;
      --cream:    #F5EDD8;
      --bone:     #FAF6EF;
      --ink:      #0E0601;
    }

    .cf-wrap {
      font-family: 'Josefin Sans', sans-serif;
      color: var(--cream);
    }

    /* ── FLOATING LABEL FIELD ── */
    .cf-field {
      position: relative;
      margin-bottom: 0;
    }
    .cf-floating-label {
      position: absolute;
      left: 20px; top: 18px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.68rem; letter-spacing: 0.2em;
      text-transform: uppercase; font-weight: 600;
      color: rgba(245,237,216,0.32);
      pointer-events: none;
      transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
      transform-origin: left top;
    }
    .cf-field:focus-within .cf-floating-label,
    .cf-field.has-value .cf-floating-label {
      top: 10px;
      font-size: 0.52rem;
      letter-spacing: 0.28em;
      color: var(--caramel);
    }
    .cf-input, .cf-textarea {
      width: 100%;
      padding: 28px 20px 12px;
      background: rgba(245,237,216,0.04);
      border: 1px solid rgba(245,237,216,0.1);
      border-radius: 16px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.95rem; font-weight: 300;
      color: var(--cream);
      outline: none;
      transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
      letter-spacing: 0.04em;
      box-sizing: border-box;
    }
    .cf-textarea {
      resize: none;
      min-height: 140px;
      padding-top: 32px;
      line-height: 1.7;
    }
    .cf-input::placeholder, .cf-textarea::placeholder { color: transparent; }
    .cf-input:focus, .cf-textarea:focus {
      border-color: rgba(193,125,60,0.55);
      background: rgba(245,237,216,0.06);
      box-shadow: 0 0 0 3px rgba(193,125,60,0.1), 0 8px 32px rgba(28,10,0,0.2);
    }
    .cf-input.error, .cf-textarea.error {
      border-color: rgba(239,68,68,0.55);
      box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
    }

    /* Character counter */
    .cf-char-bar-track {
      height: 2px;
      background: rgba(245,237,216,0.08);
      border-radius: 2px;
      overflow: hidden;
      margin-top: 6px;
    }
    .cf-char-bar-fill {
      height: 100%;
      border-radius: 2px;
      transition: width 0.2s ease, background 0.3s ease;
    }

    /* Contact info card */
    .cf-info-card {
      display: flex; align-items: center; gap: 18px;
      padding: 20px 24px;
      background: rgba(245,237,216,0.03);
      border: 1px solid rgba(193,125,60,0.15);
      border-radius: 18px;
      transition: all 0.35s ease;
      cursor: default;
    }
    .cf-info-card:hover {
      background: rgba(193,125,60,0.07);
      border-color: rgba(193,125,60,0.3);
      transform: translateX(6px);
    }
    .cf-info-icon {
      width: 44px; height: 44px; border-radius: 12px;
      background: rgba(193,125,60,0.1);
      border: 1px solid rgba(193,125,60,0.2);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    /* Response time badge */
    .cf-badge {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 7px 16px;
      background: rgba(193,125,60,0.08);
      border: 1px solid rgba(193,125,60,0.2);
      border-radius: 60px;
    }
    .cf-badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 0 2px rgba(34,197,94,0.2);
      animation: cfPulse 2s ease-in-out infinite;
    }
    @keyframes cfPulse {
      0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.2); }
      50%       { box-shadow: 0 0 0 5px rgba(34,197,94,0.08); }
    }

    /* Submit button */
    .cf-submit {
      position: relative; overflow: hidden;
      width: 100%;
      padding: 18px 36px;
      background: var(--caramel);
      border: none; cursor: pointer; border-radius: 60px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.75rem; font-weight: 600;
      letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--ink);
      transition: background 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease;
      display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .cf-submit::after {
      content: '';
      position: absolute; top: 0; left: -100%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
      transform: skewX(-20deg);
      transition: left 0.6s ease;
    }
    .cf-submit:hover:not(:disabled) {
      background: var(--cream);
      box-shadow: 0 16px 48px rgba(193,125,60,0.35);
      transform: translateY(-2px);
    }
    .cf-submit:hover::after { left: 150%; }
    .cf-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

    /* Shimmer loading bar under submit */
    .cf-progress {
      height: 2px; border-radius: 2px;
      background: linear-gradient(90deg, transparent, var(--caramel), transparent);
      background-size: 200% 100%;
      animation: cfShimmer 1.2s ease infinite;
    }
    @keyframes cfShimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    /* Mood selector */
    .cf-mood-btn {
      flex: 1;
      padding: 10px 8px;
      background: rgba(245,237,216,0.03);
      border: 1px solid rgba(245,237,216,0.08);
      border-radius: 12px;
      cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      transition: all 0.25s ease;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.55rem; letter-spacing: 0.14em;
      text-transform: uppercase; font-weight: 600;
      color: rgba(245,237,216,0.3);
    }
    .cf-mood-btn:hover {
      border-color: rgba(193,125,60,0.3);
      background: rgba(193,125,60,0.06);
      color: rgba(245,237,216,0.6);
      transform: translateY(-2px);
    }
    .cf-mood-btn.active {
      border-color: var(--caramel);
      background: rgba(193,125,60,0.12);
      color: var(--caramel);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(193,125,60,0.15);
    }
    .cf-mood-emoji { font-size: 1.3rem; line-height: 1; }

    /* Success overlay */
    .cf-success {
      position: absolute; inset: 0;
      background: linear-gradient(160deg, #1C0A00 0%, #0E0601 100%);
      border-radius: 28px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 20px; text-align: center; padding: 48px;
      z-index: 10;
    }
    .cf-success-ring {
      width: 80px; height: 80px; border-radius: 50%;
      border: 1px solid rgba(193,125,60,0.3);
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .cf-success-ring::before {
      content: '';
      position: absolute; inset: -6px; border-radius: 50%;
      border: 1px solid rgba(193,125,60,0.15);
    }

    /* Tilt card */
    .cf-form-card {
      position: relative;
      background: rgba(245,237,216,0.025);
      border: 1px solid rgba(193,125,60,0.18);
      border-radius: 28px;
      padding: 44px;
      overflow: hidden;
      backdrop-filter: blur(12px);
      will-change: transform;
    }
    .cf-form-card::before {
      content: '';
      position: absolute; inset: 0; border-radius: 28px;
      background: linear-gradient(135deg, rgba(193,125,60,0.05) 0%, transparent 60%);
      pointer-events: none;
    }

    /* Divider */
    .cf-rule { width: 36px; height: 1px; background: var(--caramel); display: inline-block; }

    @media (max-width: 900px) {
      .cf-grid { flex-direction: column !important; }
      .cf-form-card { padding: 28px 24px !important; }
    }
  `}</style>
);

/* ── FLOATING LABEL INPUT ───────────────────────────────────── */
const FloatingField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  isTextarea,
  maxLength,
  required,
}) => {
  const hasValue = value.length > 0;
  const pct = maxLength ? (value.length / maxLength) * 100 : 0;
  const barColor = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#C17D3C";

  return (
    <div className={`cf-field${hasValue ? " has-value" : ""}`}>
      <label className="cf-floating-label">{label}</label>
      {isTextarea ? (
        <textarea
          className="cf-textarea"
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          required={required}
          rows={5}
        />
      ) : (
        <input
          className="cf-input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
      {maxLength && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <div className="cf-char-bar-track" style={{flex: 1}}>
            <div
              className="cf-char-bar-fill"
              style={{width: `${pct}%`, background: barColor}}
            />
          </div>
          <span
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.1em",
              color: pct > 90 ? "#ef4444" : "rgba(245,237,216,0.25)",
              fontWeight: 600,
              minWidth: 40,
              textAlign: "right",
            }}
          >
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

/* ── TILT CARD ──────────────────────────────────────────────── */
const TiltCard = ({children}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="cf-form-card"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{type: "spring", stiffness: 200, damping: 20}}
    >
      {children}
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const ContactForm = () => {
  const [formData, setFormData] = useState({name: "", email: "", message: ""});
  const [mood, setMood] = useState(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const MAX_MSG = 500;

  const moods = [
    {key: "love", emoji: <BsCupHot />, label: "Love it"},
    {key: "question", emoji: <FaRegQuestionCircle />, label: "Question"},
    {key: "feedback", emoji: <VscFeedback />, label: "Feedback"},
    {key: "collab", emoji: <FaHandshakeSimple />, label: "Collab"},
  ];

  const moodPrompts = {
    love: "Tell us what made your day ☕",
    question: "What's on your mind? We're all ears.",
    feedback: "We genuinely love hearing what you think.",
    collab: "Tell us about your idea — let's build something.",
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    console.log("Form submitted:", {...formData, mood});
  };

  const handleReset = () => {
    setSent(false);
    setFormData({name: "", email: "", message: ""});
    setMood(null);
  };

  const contactItems = [
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C17D3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: "Email Us",
      value: "business@brewhaven.com",
      sub: "We reply within 24 hours",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C17D3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: "Call Us",
      value: "+1 (555) 123-BREW",
      sub: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C17D3C"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: "Visit Us",
      value: "72 W 38th St, New York",
      sub: "Open daily, 7am–8pm",
    },
  ];

  return (
    <>
      <ContactStyles />
      <div className="cf-wrap">
        <div
          className="cf-grid"
          style={{
            display: "flex",
            gap: 64,
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* ── LEFT: Info + context ── */}
          <div style={{flex: "1 1 320px", minWidth: 0}}>
            {/* Eyebrow */}
            <motion.div
              initial={{opacity: 0, x: -24}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.7}}
              viewport={{once: true}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <span className="cf-rule" />
              <span
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "var(--caramel)",
                  fontWeight: 600,
                }}
              >
                We're Listening
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{opacity: 0, y: 28}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
              viewport={{once: true}}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                color: "var(--cream)",
                letterSpacing: "-0.02em",
                marginBottom: 24,
              }}
            >
              Let's start a<br />
              <em
                style={{
                  color: "var(--caramel)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                conversation
              </em>
            </motion.h2>

            <motion.p
              initial={{opacity: 0, y: 16}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.7, delay: 0.25}}
              viewport={{once: true}}
              style={{
                fontSize: "0.9rem",
                lineHeight: 1.85,
                color: "rgba(245,237,216,0.5)",
                fontWeight: 300,
                letterSpacing: "0.03em",
                marginBottom: 40,
                maxWidth: 380,
              }}
            >
              Whether it's a question about our blends, a partnership idea, or
              just to say hello — your words matter to us. Every message gets a
              real reply from a real person.
            </motion.p>

            {/* Response badge */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              whileInView={{opacity: 1, y: 0}}
              transition={{delay: 0.35}}
              viewport={{once: true}}
              style={{marginBottom: 44}}
            >
              <div className="cf-badge">
                <div className="cf-badge-dot" />
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color: "rgba(245,237,216,0.6)",
                  }}
                >
                  Typically replies within 24 hours
                </span>
              </div>
            </motion.div>

            {/* Contact cards */}
            <div style={{display: "flex", flexDirection: "column", gap: 12}}>
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="cf-info-card"
                  initial={{opacity: 0, x: -20}}
                  whileInView={{opacity: 1, x: 0}}
                  transition={{duration: 0.55, delay: 0.4 + i * 0.1}}
                  viewport={{once: true}}
                >
                  <div className="cf-info-icon">{item.icon}</div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.24em",
                        textTransform: "uppercase",
                        color: "var(--caramel)",
                        fontWeight: 600,
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "0.95rem",
                        color: "var(--cream)",
                        fontWeight: 400,
                        marginBottom: 2,
                      }}
                    >
                      {item.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(245,237,216,0.35)",
                        fontWeight: 300,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div
            style={{flex: "1 1 400px", minWidth: 0}}
            initial={{opacity: 0, y: 32}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1]}}
            viewport={{once: true}}
          >
            <TiltCard>
              {/* Success overlay */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    className="cf-success"
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5, ease: [0.22, 1, 0.36, 1]}}
                  >
                    {/* Animated check ring */}
                    <motion.div
                      className="cf-success-ring"
                      initial={{scale: 0, rotate: -20}}
                      animate={{scale: 1, rotate: 0}}
                      transition={{delay: 0.15, type: "spring", stiffness: 200}}
                    >
                      <motion.svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        initial={{pathLength: 0, opacity: 0}}
                        animate={{pathLength: 1, opacity: 1}}
                        transition={{delay: 0.4, duration: 0.6}}
                      >
                        <motion.path
                          d="M7 16l6 6 12-12"
                          fill="none"
                          stroke="#C17D3C"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{pathLength: 0}}
                          animate={{pathLength: 1}}
                          transition={{delay: 0.45, duration: 0.55}}
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.div
                      initial={{opacity: 0, y: 12}}
                      animate={{opacity: 1, y: 0}}
                      transition={{delay: 0.5}}
                    >
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "1.7rem",
                          fontWeight: 600,
                          color: "var(--cream)",
                          letterSpacing: "-0.01em",
                          marginBottom: 10,
                        }}
                      >
                        Message Sent
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: 1.75,
                          color: "rgba(245,237,216,0.5)",
                          fontWeight: 300,
                          letterSpacing: "0.04em",
                          maxWidth: 280,
                          margin: "0 auto 32px",
                        }}
                      >
                        Thank you, {formData.name.split(" ")[0] || "friend"}.
                        We'll be in touch within 24 hours.
                      </p>
                      <button
                        onClick={handleReset}
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(193,125,60,0.3)",
                          color: "var(--caramel)",
                          padding: "12px 32px",
                          borderRadius: 60,
                          cursor: "pointer",
                          fontFamily: "'Josefin Sans', sans-serif",
                          fontSize: "0.68rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "rgba(193,125,60,0.1)";
                          e.target.style.borderColor = "var(--caramel)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "transparent";
                          e.target.style.borderColor = "rgba(193,125,60,0.3)";
                        }}
                      >
                        Send Another
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form header */}
              <div style={{marginBottom: 28}}>
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "var(--caramel)",
                    fontWeight: 600,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  Drop Us a Line
                </span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    color: "var(--cream)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  What's on your mind?
                </h3>
              </div>

              {/* Mood selector */}
              <div style={{marginBottom: 28}}>
                <div
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "rgba(245,237,216,0.3)",
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Reason for reaching out
                </div>
                <div style={{display: "flex", gap: 8}}>
                  {moods.map((m) => (
                    <motion.button
                      key={m.key}
                      type="button"
                      className={`cf-mood-btn${mood === m.key ? " active" : ""}`}
                      onClick={() => setMood(mood === m.key ? null : m.key)}
                      whileTap={{scale: 0.93}}
                    >
                      <span className="cf-mood-emoji">{m.emoji}</span>
                      {m.label}
                    </motion.button>
                  ))}
                </div>

                {/* Mood hint text */}
                <AnimatePresence mode="wait">
                  {mood && (
                    <motion.p
                      key={mood}
                      initial={{opacity: 0, y: -6}}
                      animate={{opacity: 1, y: 0}}
                      exit={{opacity: 0, y: -4}}
                      transition={{duration: 0.25}}
                      style={{
                        marginTop: 10,
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        color: "rgba(193,125,60,0.7)",
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                      }}
                    >
                      "{moodPrompts[mood]}"
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Thin divider */}
              <div
                style={{
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(193,125,60,0.2), transparent)",
                  marginBottom: 28,
                }}
              />

              {/* Form fields */}
              <form onSubmit={handleSubmit}>
                <div
                  style={{display: "flex", flexDirection: "column", gap: 16}}
                >
                  {/* Name + Email row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                  >
                    <FloatingField
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <FloatingField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Message */}
                  <FloatingField
                    label={mood ? moodPrompts[mood] : "Your Message"}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isTextarea
                    maxLength={MAX_MSG}
                    required
                  />

                  {/* Submit */}
                  <div>
                    <motion.button
                      className="cf-submit"
                      type="submit"
                      disabled={
                        sending ||
                        !formData.name ||
                        !formData.email ||
                        !formData.message
                      }
                      whileTap={{scale: 0.97}}
                    >
                      {sending ? (
                        <>
                          <motion.span
                            animate={{rotate: 360}}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            style={{
                              display: "inline-block",
                              width: 14,
                              height: 14,
                              border: "2px solid rgba(14,6,1,0.2)",
                              borderTopColor: "var(--ink)",
                              borderRadius: "50%",
                            }}
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </>
                      )}
                    </motion.button>

                    {/* Progress bar while sending */}
                    <AnimatePresence>
                      {sending && (
                        <motion.div
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                          style={{marginTop: 10}}
                        >
                          <div className="cf-progress" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </form>

              {/* Bottom note */}
              <p
                style={{
                  marginTop: 20,
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  color: "rgba(245,237,216,0.2)",
                  textAlign: "center",
                  fontWeight: 300,
                }}
              >
                We respect your privacy. No spam, ever.
              </p>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
