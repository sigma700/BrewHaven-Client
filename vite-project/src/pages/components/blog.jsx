import React, {useState, useRef, useEffect, useCallback} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {Link} from "react-router-dom";

/* ── DATA ───────────────────────────────────────────────────── */
const coffeeStories = [
  {
    id: 1,
    title: "Coffee Prices Surge to Record Highs",
    subtitle: "What's Next for 2026?",
    excerpt:
      "Arabica futures reached unprecedented levels of $4.41/lb, creating new challenges across the supply chain as prices remain consistently high.",
    image: "/market.jpg",
    category: "Market Trends",
    readTime: "4 min",
    date: "Oct 22, 2025",
    source: "Perfect Daily Grind",
    color: "#8B4513",
    featured: true,
  },
  {
    id: 2,
    title: "Deforestation Imperils Coffee Production",
    subtitle: "Brazil's Vanishing Forests",
    excerpt:
      "New research reveals how forest clearing for coffee farms reduces rainfall and threatens long-term crop viability across South America.",
    image: "/defforest.jpg",
    category: "Sustainability",
    readTime: "5 min",
    date: "Oct 22, 2025",
    source: "The New York Times",
    color: "#2D5016",
    featured: true,
  },
  {
    id: 3,
    title: "The Dancing Goats",
    subtitle: "Ethiopia's Discovery Legend",
    excerpt:
      "How a 9th-century goatherd named Kaldi discovered coffee's energizing effects through his mysteriously lively goats.",
    image: "/ethiopia.jpg",
    category: "History",
    readTime: "3 min",
    date: "Oct 20, 2025",
    source: "Cuisine Barista",
    color: "#6B3A2A",
    featured: false,
  },
  {
    id: 4,
    title: "Coffee & The French Revolution",
    subtitle: "How Cafés Changed History",
    excerpt:
      "How Parisian cafés became breeding grounds for revolutionary ideas and political change in 18th century France.",
    image: "/french-rev.jpg",
    category: "Culture",
    readTime: "4 min",
    date: "Oct 18, 2025",
    source: "Cuisine Barista",
    color: "#4A3728",
    featured: false,
  },
  {
    id: 5,
    title: "Jack Simpson: World Champion",
    subtitle: "Australia's Finest Barista",
    excerpt:
      "After remarkable back-to-back performances, Simpson claims the top prize in international coffee competition.",
    image: "/barista-sam.jpg",
    category: "Industry News",
    readTime: "3 min",
    date: "Oct 15, 2025",
    source: "Daily Coffee News",
    color: "#1C3A5C",
    featured: false,
  },
  {
    id: 6,
    title: "The King's Failed Experiment",
    subtitle: "Gustav III vs. Coffee",
    excerpt:
      "How Gustav III's attempt to prove coffee's dangers backfired spectacularly in the 18th century Swedish court.",
    image: "/experiment.jpg",
    category: "History",
    readTime: "3 min",
    date: "Oct 12, 2025",
    source: "Cuisine Barista",
    color: "#3D2B1F",
    featured: false,
  },
];

/* ── STYLES ─────────────────────────────────────────────────── */
const BlogStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,300;1,400;1,600&family=Josefin+Sans:wght@300;400;600&display=swap');

    :root {
      --espresso: #1C0A00;
      --roast:    #3B1A08;
      --caramel:  #C17D3C;
      --cream:    #F5EDD8;
      --fog:      #EDE5D5;
      --bone:     #FAF6EF;
    }

    .bg-blog { font-family: 'Josefin Sans', sans-serif; }

    /* ── CUSTOM CURSOR ── */
    .blog-cursor {
      position: fixed;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
    }
    .blog-cursor-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--caramel);
      transform: translate(-50%, -50%);
    }
    .blog-cursor-ring {
      width: 36px; height: 36px; border-radius: 50%;
      border: 1px solid rgba(193,125,60,0.5);
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    }
    .blog-cursor-ring.expanded {
      width: 72px; height: 72px;
      border-color: rgba(193,125,60,0.8);
    }

    /* ── CAROUSEL ── */
    .carousel-track {
      display: flex;
      gap: 28px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 8px;
      cursor: grab;
    }
    .carousel-track::-webkit-scrollbar { display: none; }
    .carousel-track:active { cursor: grabbing; }

    .carousel-card {
      flex: 0 0 520px;
      scroll-snap-align: start;
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      height: 400px;
      border: 1px solid rgba(193,125,60,0.15);
    }

    .carousel-card-img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                  filter 0.5s ease;
      filter: brightness(0.55) saturate(1.1);
    }
    .carousel-card:hover .carousel-card-img {
      transform: scale(1.07);
      filter: brightness(0.42) saturate(1.2);
    }

    /* Card glass overlay */
    .carousel-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(14,6,1,0.95) 0%, rgba(14,6,1,0.4) 50%, transparent 100%);
    }

    /* Content slides up on hover */
    .carousel-content {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      padding: 32px 28px;
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .carousel-excerpt {
      font-size: 0.83rem; line-height: 1.7;
      color: rgba(245,237,216,0.6);
      font-weight: 300; letter-spacing: 0.04em;
      max-height: 0; overflow: hidden;
      opacity: 0;
      transition: max-height 0.5s ease, opacity 0.4s ease 0.1s;
      margin-bottom: 0;
    }
    .carousel-card:hover .carousel-excerpt {
      max-height: 100px;
      opacity: 1;
      margin-bottom: 16px;
    }
    .carousel-read-btn {
      display: inline-flex; align-items: center; gap: 8px;
      opacity: 0; transform: translateY(8px);
      transition: opacity 0.35s ease 0.2s, transform 0.35s ease 0.2s;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.65rem; letter-spacing: 0.22em;
      text-transform: uppercase; font-weight: 600;
      color: var(--caramel); text-decoration: none;
      border: 1px solid rgba(193,125,60,0.35);
      padding: 9px 20px; border-radius: 60px;
      background: rgba(193,125,60,0.08);
    }
    .carousel-card:hover .carousel-read-btn {
      opacity: 1; transform: translateY(0);
    }
    .carousel-read-btn:hover {
      background: var(--caramel);
      color: var(--ink, #0E0601);
      border-color: var(--caramel);
    }

    /* ── CATEGORY TAG ── */
    .cat-tag {
      display: inline-block;
      padding: 5px 14px;
      border-radius: 60px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.58rem; letter-spacing: 0.22em;
      text-transform: uppercase; font-weight: 600;
      background: rgba(193,125,60,0.18);
      border: 1px solid rgba(193,125,60,0.3);
      color: var(--caramel);
    }

    /* ── SCROLL PROGRESS ── */
    .scroll-dots {
      display: flex; gap: 6px; justify-content: center;
      margin-top: 20px;
    }
    .scroll-dot {
      width: 6px; height: 6px; border-radius: 3px;
      background: rgba(193,125,60,0.2);
      transition: width 0.3s ease, background 0.3s ease;
      cursor: pointer;
    }
    .scroll-dot.active {
      width: 24px;
      background: var(--caramel);
    }

    /* ── GRID CARD ── */
    .grid-card {
      position: relative;
      background: #fff;
      border: 1px solid rgba(193,125,60,0.1);
      border-radius: 20px;
      overflow: hidden;
      transition: box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease;
      will-change: transform;
    }
    .grid-card:hover {
      box-shadow: 0 24px 64px rgba(28,10,0,0.12);
      transform: translateY(-6px);
      border-color: rgba(193,125,60,0.25);
    }

    /* Image shimmer on hover */
    .grid-card-img-wrap {
      position: relative; overflow: hidden;
    }
    .grid-card-img {
      width: 100%; height: 200px; object-fit: cover;
      transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), filter 0.4s ease;
    }
    .grid-card:hover .grid-card-img {
      transform: scale(1.08);
      filter: brightness(0.85);
    }

    /* Shimmer sweep */
    .grid-card-img-wrap::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(105deg, transparent 40%, rgba(193,125,60,0.15) 50%, transparent 60%);
      background-size: 200% 100%;
      background-position: -200% 0;
      transition: background-position 0.0s;
      pointer-events: none;
    }
    .grid-card:hover .grid-card-img-wrap::after {
      background-position: 200% 0;
      transition: background-position 0.6s ease;
    }

    /* Read more arrow that animates on hover */
    .read-arrow {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.62rem; letter-spacing: 0.2em;
      text-transform: uppercase; font-weight: 600;
      color: var(--caramel); text-decoration: none;
      transition: gap 0.3s ease;
    }
    .grid-card:hover .read-arrow { gap: 10px; }
    .read-arrow-icon {
      display: inline-block;
      transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .grid-card:hover .read-arrow-icon { transform: translateX(4px); }

    /* ── SECTION RULE ── */
    .blog-rule { width: 40px; height: 1px; background: var(--caramel); display: inline-block; }

    /* ── DRAG HINT ── */
    .drag-hint {
      display: flex; align-items: center; gap: 10px;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 0.58rem; letter-spacing: 0.22em;
      text-transform: uppercase; color: rgba(28,10,0,0.3);
      font-weight: 600;
    }
    .drag-hint-line {
      width: 32px; height: 1px;
      background: linear-gradient(to right, rgba(193,125,60,0.4), transparent);
      animation: dragSlide 2s ease-in-out infinite;
    }
    @keyframes dragSlide {
      0%, 100% { transform: translateX(0); opacity: 1; }
      50%       { transform: translateX(6px); opacity: 0.5; }
    }

    /* Glare shows on hover */
    .grid-card:hover .card-glare { opacity: 1 !important; }

    /* ── NUMBER TAG ── */
    .story-num {
      position: absolute;
      top: 20px; right: 20px;
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem; font-weight: 700; font-style: italic;
      color: rgba(193,125,60,0.12);
      line-height: 1; pointer-events: none;
      user-select: none;
    }
    .grid-card:hover .story-num { color: rgba(193,125,60,0.22); }

    @media (max-width: 640px) {
      .carousel-card { flex: 0 0 320px; height: 320px; }
      .grid-card-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
const BlogCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);
  const ringX = useSpring(dotX, {stiffness: 140, damping: 18});
  const ringY = useSpring(dotY, {stiffness: 140, damping: 18});

  useEffect(() => {
    const onMove = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    window.addEventListener("mousemove", onMove);
    document
      .querySelectorAll("a, button, .carousel-card, .grid-card")
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <motion.div className="blog-cursor" style={{left: dotX, top: dotY}}>
        <div className="blog-cursor-dot" />
      </motion.div>
      <motion.div className="blog-cursor" style={{left: ringX, top: ringY}}>
        <div className={`blog-cursor-ring${hovered ? " expanded" : ""}`} />
      </motion.div>
    </>
  );
};
/* ── FEATURED CAROUSEL ──────────────────────────────────────── */
const FeaturedCarousel = ({stories}) => {
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [cardWidth, setCardWidth] = useState(520); // Default width

  // Calculate actual card width including gap on mount and resize
  useEffect(() => {
    const updateCardWidth = () => {
      if (trackRef.current && trackRef.current.children[0]) {
        const firstCard = trackRef.current.children[0];
        const rect = firstCard.getBoundingClientRect();
        const gap = 28; // gap between cards
        setCardWidth(rect.width + gap);
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const onScroll = () => {
    if (!trackRef.current) return;
    const scrollPosition = trackRef.current.scrollLeft;
    const idx = Math.round(scrollPosition / cardWidth);
    setActiveIdx(Math.min(idx, stories.length - 1));
  };

  const scrollTo = (i) => {
    if (!trackRef.current) return;
    const targetScroll = i * cardWidth;
    trackRef.current.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
    setActiveIdx(i);
  };

  /* Drag-to-scroll */
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.userSelect = "none";
    trackRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // scroll speed multiplier
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.userSelect = "";
      trackRef.current.style.cursor = "grab";
    }
  };

  // Disable drag when clicking on buttons/links
  const onMouseDownCapture = (e) => {
    if (e.target.closest("button") || e.target.closest("a")) {
      isDragging.current = false;
    }
  };

  return (
    <div>
      <div
        ref={trackRef}
        className="carousel-track"
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseDownCapture={onMouseDownCapture}
        style={{cursor: "grab"}}
      >
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            className="carousel-card"
            initial={{opacity: 0, x: 40}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.6, delay: i * 0.12}}
            viewport={{once: true}}
          >
            <img
              className="carousel-card-img"
              src={story.image}
              alt={story.title}
              draggable="false"
            />
            <div className="carousel-overlay" />

            {/* Top meta */}
            <div
              style={{
                position: "absolute",
                top: 24,
                left: 28,
                right: 28,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span className="cat-tag">{story.category}</span>
              <div style={{textAlign: "right"}}>
                <div
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    color: "rgba(245,237,216,0.45)",
                    textTransform: "uppercase",
                  }}
                >
                  {story.date}
                </div>
                <div
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.14em",
                    color: "rgba(245,237,216,0.3)",
                    marginTop: 2,
                  }}
                >
                  {story.readTime} read
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="carousel-content">
              <p className="carousel-excerpt">{story.excerpt}</p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: 6,
                }}
              >
                {story.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "var(--caramel)",
                  marginBottom: 16,
                }}
              >
                {story.subtitle}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.16em",
                    color: "rgba(245,237,216,0.3)",
                    textTransform: "uppercase",
                  }}
                >
                  {story.source}
                </span>
                <Link to={`/blog/${story.id}`} className="carousel-read-btn">
                  Read Story
                  <svg
                    width="12"
                    height="12"
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
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dot nav + drag hint */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          padding: "0 4px",
        }}
      >
        <div className="drag-hint">
          <div className="drag-hint-line" />
          Drag to explore
        </div>
        <div className="scroll-dots">
          {stories.map((_, i) => (
            <div
              key={i}
              className={`scroll-dot${activeIdx === i ? " active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
        <div style={{display: "flex", gap: 8}}>
          <button
            onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(193,125,60,0.25)",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--caramel)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(193,125,60,0.1)";
              e.currentTarget.style.borderColor = "var(--caramel)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(193,125,60,0.25)";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() =>
              scrollTo(Math.min(stories.length - 1, activeIdx + 1))
            }
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(193,125,60,0.25)",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--caramel)",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(193,125,60,0.1)";
              e.currentTarget.style.borderColor = "var(--caramel)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(193,125,60,0.25)";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── MAGNETIC GRID CARD ─────────────────────────────────────── */
const GridCard = ({story, index}) => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smooth the raw values so motion feels physical
  const springConfig = {stiffness: 180, damping: 18, mass: 0.6};
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  // Map normalised [-0.5, 0.5] → rotation degrees (larger = more dramatic)
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Subtle shine highlight that tracks the mouse
  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const formattedDate = story.date;

  return (
    // Perspective MUST be on the parent — not the rotating element
    <motion.div
      initial={{opacity: 0, y: 32}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: index * 0.1}}
      viewport={{once: true}}
      style={{perspective: "800px"}}
    >
      <motion.div
        ref={ref}
        className="grid-card"
        style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {/* Story number */}
        <div className="story-num">{String(index + 1).padStart(2, "0")}</div>

        {/* Image */}
        <div className="grid-card-img-wrap">
          <img className="grid-card-img" src={story.image} alt={story.title} />

          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(28,10,0,0.4) 0%, transparent 60%)",
              transition: "opacity 0.4s ease",
            }}
          />

          {/* Category tag */}
          <div style={{position: "absolute", bottom: 14, left: 14}}>
            <span
              className="cat-tag"
              style={{
                background: "rgba(14,6,1,0.65)",
                backdropFilter: "blur(6px)",
              }}
            >
              {story.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{padding: "22px 24px 24px"}}>
          {/* Meta */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "rgba(28,10,0,0.35)",
                textTransform: "uppercase",
              }}
            >
              {formattedDate}
            </span>
            <div
              style={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(193,125,60,0.4)",
              }}
            />
            <span
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                color: "rgba(28,10,0,0.35)",
                textTransform: "uppercase",
              }}
            >
              {story.readTime} read
            </span>
          </div>

          {/* Title */}
          <h4
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "var(--espresso)",
              lineHeight: 1.3,
              letterSpacing: "-0.01em",
              marginBottom: 4,
            }}
          >
            {story.title}
          </h4>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "0.85rem",
              color: "var(--caramel)",
              marginBottom: 12,
            }}
          >
            {story.subtitle}
          </p>

          {/* Excerpt */}
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "0.8rem",
              lineHeight: 1.75,
              color: "rgba(28,10,0,0.5)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              marginBottom: 20,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {story.excerpt}
          </p>

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 16,
              borderTop: "1px solid rgba(193,125,60,0.1)",
            }}
          >
            <span
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                color: "rgba(28,10,0,0.3)",
                textTransform: "uppercase",
              }}
            >
              {story.source}
            </span>
            <Link to={`/blog/${story.id}`} className="read-arrow">
              Read
              <span className="read-arrow-icon">
                <svg
                  width="11"
                  height="11"
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
              </span>
            </Link>
          </div>
        </div>

        {/* Mouse-tracking glare highlight */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 50%, rgba(193,125,60,0.12) 0%, transparent 65%)",
            backgroundPositionX: glareX,
            backgroundPositionY: glareY,
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.3s ease",
            borderRadius: 20,
          }}
          className="card-glare"
        />

        {/* Bottom accent line that grows on hover */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: "0%",
            background:
              "linear-gradient(to right, var(--caramel), transparent)",
            transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            borderRadius: "0 0 20px 20px",
          }}
          className="card-bottom-line"
        />
      </motion.div>
    </motion.div>
  );
};

/* ── CATEGORY FILTER ────────────────────────────────────────── */
const categories = [
  "All",
  ...Array.from(new Set(coffeeStories.map((s) => s.category))),
];

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const BlogGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = coffeeStories.filter((s) => s.featured);
  const allNonFeat = coffeeStories.filter((s) => !s.featured);
  const filtered =
    activeCategory === "All"
      ? allNonFeat
      : allNonFeat.filter((s) => s.category === activeCategory);

  return (
    <>
      <BlogStyles />
      <style>{`
        .grid-card:hover .card-bottom-line { width: 100% !important; }
      `}</style>

      <div className="bg-blog">
        {/* ── FEATURED CAROUSEL ── */}
        <motion.div
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.7}}
          viewport={{once: true}}
          style={{marginBottom: 72}}
        >
          {/* Carousel header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 1,
                    background: "var(--caramel)",
                    display: "inline-block",
                  }}
                />
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
                  Editor's Pick
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--espresso)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                Featured Stories
              </h3>
            </div>
            <Link
              to="/blog"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--caramel)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "gap 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}
            >
              View All
              <svg
                width="12"
                height="12"
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
            </Link>
          </div>

          <FeaturedCarousel stories={featured} />
        </motion.div>

        {/* ── MORE STORIES ── */}
        <motion.div
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.7}}
          viewport={{once: true}}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 36,
                    height: 1,
                    background: "var(--caramel)",
                    display: "inline-block",
                  }}
                />
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
                  From the Archive
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  color: "var(--espresso)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                More Stories
              </h3>
            </div>

            {/* Category filter pills */}
            <div style={{display: "flex", gap: 8, flexWrap: "wrap"}}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{scale: 0.94}}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 60,
                    border:
                      activeCategory === cat
                        ? "1px solid var(--caramel)"
                        : "1px solid rgba(28,10,0,0.12)",
                    background:
                      activeCategory === cat ? "var(--caramel)" : "transparent",
                    cursor: "pointer",
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    color:
                      activeCategory === cat
                        ? "var(--ink, #0E0601)"
                        : "rgba(28,10,0,0.4)",
                    transition: "all 0.28s ease",
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Filtered grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid-card-grid"
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -8}}
              transition={{duration: 0.4}}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {filtered.length > 0 ? (
                filtered.map((story, i) => (
                  <GridCard key={story.id} story={story} index={i} />
                ))
              ) : (
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  style={{
                    gridColumn: "1/-1",
                    textAlign: "center",
                    padding: "48px 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontSize: "1.2rem",
                      color: "rgba(28,10,0,0.3)",
                    }}
                  >
                    No stories in this category yet.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
};

export default BlogGrid;
