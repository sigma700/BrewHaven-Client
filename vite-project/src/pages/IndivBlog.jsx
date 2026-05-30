import React, {useState, useEffect, useRef} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {Link, useParams} from "react-router-dom";

/* ── DATA ───────────────────────────────────────────────────── */
const coffeeStories = [
  {
    id: 1,
    title: "Coffee Prices Surge to Record Highs — What's Next for 2026?",
    excerpt:
      "Arabica futures reached unprecedented levels of $4.41/lb, creating new challenges across the supply chain as prices remain consistently high.",
    image: "/market.jpg",
    category: "Market Trends",
    readTime: "4 min read",
    date: "October 22, 2025",
    source: "Perfect Daily Grind",
    fullContent:
      "Sustained high green coffee prices have been a defining factor of the coffee industry in 2025. Climate change, political instability, tariffs, and global economic pressures are adding layers of complexity to an already fragile supply chain.\n\nThe surge began in late 2024 when drought conditions across Brazil's Minas Gerais region decimated the Arabica harvest by an estimated 18%. Combined with currency volatility in Colombia and Vietnam — the world's top two coffee producers — futures markets responded with volatility not seen since the frosts of 1994.\n\nFor specialty roasters like BrewHaven, the impact has been felt at every link in the chain. Green coffee now represents nearly 60% of total production costs, up from 42% just three years ago. Some smaller roasters have been forced to either raise retail prices aggressively or quietly reduce bag weights — a practice industry insiders are calling 'shrinkflation of the cup.'\n\nThe coffee industry continues to evolve with these market dynamics, creating both challenges and opportunities for producers, roasters, and consumers alike. Analysts at the International Coffee Organization project that prices may stabilise by Q3 2026 if La Niña conditions ease — but the era of sub-$2 green coffee appears to be over for good.",
    featured: true,
    tags: ["Prices", "Supply Chain", "Arabica", "2026"],
  },
  {
    id: 2,
    title: "Deforestation Imperils Coffee Production in Brazil",
    excerpt:
      "New research reveals how forest clearing for coffee farms reduces rainfall and threatens long-term crop viability.",
    image: "/defforest.jpg",
    category: "Sustainability",
    readTime: "5 min read",
    date: "October 22, 2025",
    source: "The New York Times",
    fullContent:
      "Every day, we drink more than two billion cups of coffee worldwide. To grow beans to quench this thirst, ever more forests have been felled globally for farming.\n\nNew research published in Nature Sustainability draws a direct causal line between deforestation in Brazil's Cerrado biome and declining rainfall patterns over key coffee-growing regions. The findings suggest that as tree cover drops below 30% of a watershed's total area, precipitation falls by up to 22% — a threshold already breached in parts of São Paulo and Minas Gerais.\n\nThe irony is sharp: the very expansion of coffee farming is undermining the rainfall coffee trees need to survive. Without intervention, researchers warn that Brazil — which supplies 40% of the world's coffee — could see its productive growing area shrink by a third by 2050.\n\nSome producers are responding with agroforestry systems that intercrop coffee with native shade trees, restoring partial canopy cover while maintaining yields. BrewHaven works exclusively with farms that maintain a minimum 40% shade canopy, a standard we believe the broader industry must adopt.",
    featured: true,
    tags: ["Brazil", "Environment", "Climate", "Farming"],
  },
  {
    id: 3,
    title: "The Dancing Goats: Ethiopia's Coffee Discovery Legend",
    excerpt:
      "How a 9th-century goatherd named Kaldi discovered coffee's energising effects through his lively goats.",
    image: "/ethiopia.jpg",
    category: "History",
    readTime: "3 min read",
    date: "October 20, 2025",
    source: "Cuisine Barista",
    fullContent:
      "One of the most enduring legends about coffee comes from the highlands of Ethiopia. According to the story, the goatherd Kaldi noticed in the 9th century that his goats became unusually energetic after eating berries from a certain tree — dancing through the night without sleeping.\n\nKaldi brought the berries to a local monastery, where a monk made a drink from them and discovered he could stay alert through long evening prayers. Word spread east, and coffee soon made its way to the Arabian Peninsula, where it was cultivated and traded for the first time.\n\nWhether the legend is literally true matters little. What it captures perfectly is coffee's fundamental nature: a gift from the wild, stumbled upon by accident, that would quietly reshape the rhythms of human civilisation.\n\nEthiopia remains the genetic heartland of Coffea arabica. More than a thousand distinct varieties grow wild across the country's highland forests — a biodiversity that represents the species' best hope for resilience against a warming climate.",
    featured: false,
    tags: ["Ethiopia", "Origins", "Legend", "History"],
  },
  {
    id: 4,
    title: "Coffee Houses Fuelled the French Revolution",
    excerpt:
      "How Parisian cafés became breeding grounds for revolutionary ideas and political change in 18th century France.",
    image: "/french-rev.jpg",
    category: "Culture",
    readTime: "4 min read",
    date: "October 18, 2025",
    source: "Cuisine Barista",
    fullContent:
      "In France, coffee houses played a crucial role in the French Revolution. In 1789, at the famous Café de Foy in the Palais-Royal, journalist Camille Desmoulins delivered the speech that many historians mark as the spark of the insurrection — jumping onto a table, pistol in hand, urging the crowd to take up arms.\n\nParis had more than 600 cafés by the eve of the revolution. Unlike taverns, which blurred thought with alcohol, coffeehouses sharpened it. Men of every class — lawyers, philosophers, merchants, artisans — sat side by side over cups of café noir and argued about liberty, taxation, and the rights of man.\n\nThe Enlightenment was, in many ways, a caffeinated movement. Voltaire is said to have drunk 50 cups of coffee a day. Rousseau wrote in coffeehouses. The ideas that toppled a monarchy were refined over demitasses.\n\nThis is why BrewHaven considers the coffeehouse not merely a retail format but a civic institution — a place where clarity of thought and equality of access have always gone hand in hand.",
    featured: false,
    tags: ["France", "History", "Culture", "Revolution"],
  },
  {
    id: 5,
    title: "Australia's Jack Simpson Crowned 2025 World Barista Champion",
    excerpt:
      "After remarkable back-to-back performances, Simpson claims the top prize in international coffee competition.",
    image: "/barista-sam.jpg",
    category: "Industry News",
    readTime: "3 min read",
    date: "October 15, 2025",
    source: "Daily Coffee News",
    fullContent:
      "Australia's Jack Simpson was crowned the 2025 World Barista Champion, capping a remarkable competition run that included a runner-up WBC finish in 2024 and a string of national titles that made him the dominant figure in Australian specialty coffee for three consecutive years.\n\nSimpson's winning presentation centred on a naturals-processed Gesha variety from a small producer in Panama, served as both an espresso and a milk-based preparation that the judges described as 'the clearest expression of terroir we have encountered in competition.'\n\nThe World Barista Championship, held annually under the auspices of the World Coffee Events body, draws competitors from more than 60 countries. Each competitor has 15 minutes to serve four espressos, four milk drinks, and four signature beverages to a panel of international judges — a format designed to test technical precision, sensory knowledge, and the ability to communicate passion under pressure.\n\nSimpson's win marks the second time in five years that an Australian has taken the title, cementing the country's reputation as one of the world's foremost specialty coffee cultures.",
    featured: false,
    tags: ["Competition", "Barista", "Australia", "2025"],
  },
  {
    id: 6,
    title: "The Swedish King's Failed Coffee Experiment",
    excerpt:
      "How Gustav III's attempt to prove coffee's dangers backfired spectacularly in the 18th century.",
    image: "/experiment.jpg",
    category: "History",
    readTime: "3 min read",
    date: "October 12, 2025",
    source: "Cuisine Barista",
    fullContent:
      "In the 18th century, King Gustav III of Sweden believed that coffee was dangerous and caused health problems. Coffee had already been banned twice in the country, and Gustav was determined to prove the case scientifically — in what may be history's first controlled experiment in a royal court.\n\nHe identified a pair of identical twins who had been convicted of murder and sentenced to death. Rather than execute them, Gustav commuted their sentences on one condition: one twin would drink three pots of coffee daily, the other three pots of tea, for the rest of their lives. Two physicians were appointed to monitor the experiment and record which twin died first.\n\nBoth physicians died before either twin. Gustav III was assassinated in 1792. The tea-drinking twin died first, at an unrecorded age. The coffee drinker lived to be the last survivor of the entire experiment.\n\nThe king's attempt to vilify coffee became, inadvertently, one of the earliest pieces of evidence for its safety. Sweden today has one of the highest per-capita coffee consumption rates in the world — a delicious historical irony that Gustav III would have found deeply inconvenient.",
    featured: false,
    tags: ["Sweden", "History", "Science", "Curiosity"],
  },
];

/* Related posts — pick 2 from the same category or adjacent */
function getRelated(post, all) {
  return all
    .filter(
      (p) => p.id !== post.id && (p.category === post.category || p.featured),
    )
    .slice(0, 2);
}

/* ── READING PROGRESS BAR ───────────────────────────────────── */
function ReadingProgress() {
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

/* ── ESTIMATED READING TIME TICK ───────────────────────────── */
function ReadingTicker({readTime}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 16px",
        borderRadius: 60,
        border: "1px solid rgba(193,125,60,0.25)",
        background: "rgba(193,125,60,0.06)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5" stroke="#C17D3C" strokeWidth="1.2" />
        <path
          d="M6 3v3l2 1.5"
          stroke="#C17D3C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontSize: "0.72rem",
          color: "#C17D3C",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {readTime}
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
const BlogPost = () => {
  const {id} = useParams();
  const post = coffeeStories.find((s) => s.id === parseInt(id));
  const related = post ? getRelated(post, coffeeStories) : [];
  const [copied, setCopied] = useState(false);
  const articleRef = useRef(null);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* Paragraph split for cinematic reveal */
  const paragraphs = post ? post.fullContent.split("\n\n") : [];

  if (!post) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#FAF6EF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Outfit', sans-serif",
          gap: 24,
        }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');`}</style>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "3rem",
            color: "#1C0A00",
          }}
        >
          Story Not Found
        </h1>
        <Link
          to="/"
          style={{
            color: "#C17D3C",
            fontWeight: 500,
            fontSize: "0.9rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article
      style={{
        minHeight: "100vh",
        background: "#FAF6EF",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        :root {
          --espresso: #1C0A00;
          --roast:    #3B1A08;
          --caramel:  #C17D3C;
          --cream:    #F5EDD8;
          --bone:     #FAF6EF;
        }

        * { box-sizing: border-box; }

        body { overflow-x: hidden; }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: var(--cream); }
        ::-webkit-scrollbar-thumb { background: var(--caramel); }

        .serif { font-family: 'Cormorant Garamond', serif; }

        /* Grain */
        .grain::before {
          content: '';
          position: fixed; inset: 0;
          pointer-events: none; z-index: 9998;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 128px;
        }

        .nav-back {
          display: inline-flex; align-items: center; gap: 8px;
          text-decoration: none;
          color: var(--espresso); opacity: 0.55;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          transition: opacity 0.25s, color 0.25s;
        }
        .nav-back:hover { opacity: 1; color: var(--caramel); }

        .tag {
          display: inline-block;
          padding: 5px 14px; border-radius: 60px;
          border: 1px solid rgba(193,125,60,0.22);
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--caramel); background: rgba(193,125,60,0.05);
          transition: all 0.25s;
        }
        .tag:hover { background: var(--caramel); color: #fff; }

        .share-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 60px;
          border: 1.5px solid rgba(28,10,0,0.14);
          background: transparent; cursor: pointer;
          font-family: 'Outfit', sans-serif;
          font-size: 0.72rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--espresso); transition: all 0.3s;
        }
        .share-btn:hover { background: var(--espresso); color: var(--cream); border-color: var(--espresso); }

        .related-card {
          display: block; text-decoration: none;
          background: #fff;
          border: 1px solid rgba(193,125,60,0.1);
          border-radius: 20px; overflow: hidden;
          transition: box-shadow 0.35s, transform 0.35s;
        }
        .related-card:hover {
          box-shadow: 0 20px 60px rgba(28,10,0,0.12);
          transform: translateY(-4px);
        }

        /* Blockquote style for excerpt */
        .article-pull {
          border-left: 2px solid var(--caramel);
          padding: 8px 0 8px 28px;
          margin: 48px 0;
        }
      `}</style>

      <ReadingProgress />

      {/* ══ STICKY NAV ══════════════════════════════════════════ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(250,246,239,0.9)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(193,125,60,0.12)",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/#blog" className="nav-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9 2L4 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All Stories
          </Link>

          <Link to="/" style={{textDecoration: "none"}}>
            <span
              className="serif"
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "var(--espresso)",
                letterSpacing: "-0.02em",
              }}
            >
              BrewHaven
            </span>
          </Link>

          <button
            className="share-btn"
            onClick={copyLink}
            style={{fontSize: "0.68rem"}}
          >
            {copied ? "✓ Copied" : "Share"}
          </button>
        </div>
      </nav>

      {/* ══ HERO HEADER ═════════════════════════════════════════ */}
      <header
        style={{maxWidth: 820, margin: "0 auto", padding: "72px 32px 48px"}}
      >
        {/* Category + meta row */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "var(--espresso)",
              color: "var(--cream)",
              padding: "6px 18px",
              borderRadius: 60,
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {post.category}
          </span>
          <ReadingTicker readTime={post.readTime} />
          <span
            style={{
              fontSize: "0.78rem",
              color: "rgba(28,10,0,0.4)",
              fontWeight: 300,
            }}
          >
            {post.date}
          </span>
          <span
            style={{
              fontSize: "0.78rem",
              color: "rgba(28,10,0,0.4)",
              fontWeight: 300,
            }}
          >
            ·
          </span>
          <span
            style={{
              fontSize: "0.78rem",
              color: "rgba(28,10,0,0.4)",
              fontWeight: 300,
            }}
          >
            via {post.source}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1]}}
          className="serif"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            color: "var(--espresso)",
            marginBottom: 28,
            letterSpacing: "-0.025em",
          }}
        >
          {post.title}
        </motion.h1>

        {/* Excerpt — pull quote style */}
        <motion.div
          initial={{opacity: 0, x: -16}}
          animate={{opacity: 1, x: 0}}
          transition={{duration: 0.7, delay: 0.25}}
          className="article-pull"
        >
          <p
            className="serif"
            style={{
              fontSize: "1.35rem",
              fontStyle: "italic",
              color: "rgba(28,10,0,0.6)",
              lineHeight: 1.65,
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            {post.excerpt}
          </p>
        </motion.div>
      </header>

      {/* ══ HERO IMAGE ══════════════════════════════════════════ */}
      <motion.div
        initial={{opacity: 0, scale: 0.97}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1]}}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          marginBottom: 80,
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(28,10,0,0.18)",
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "clamp(320px, 50vw, 560px)",
              objectFit: "cover",
              display: "block",
            }}
          />
          {/* Subtle vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(28,10,0,0.15) 0%, transparent 40%)",
              pointerEvents: "none",
            }}
          />
          {/* Category chip on image */}
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              background: "rgba(250,246,239,0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(250,246,239,0.2)",
              color: "var(--cream)",
              padding: "6px 18px",
              borderRadius: 60,
              fontSize: "0.68rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {post.category}
          </div>
        </div>
      </motion.div>

      {/* ══ ARTICLE BODY ════════════════════════════════════════ */}
      <div
        style={{maxWidth: 720, margin: "0 auto", padding: "0 32px 120px"}}
        ref={articleRef}
      >
        {/* Body paragraphs with staggered reveal */}
        <div style={{position: "relative"}}>
          {/* Decorative left rule */}
          <div
            style={{
              position: "absolute",
              left: -28,
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(193,125,60,0.2) 20%, rgba(193,125,60,0.2) 80%, transparent)",
            }}
          />

          {paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.65, delay: i * 0.04}}
              viewport={{once: true, margin: "-60px"}}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.95,
                color: "rgba(28,10,0,0.7)",
                fontWeight: 300,
                marginBottom: 32,
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: "0.01em",
              }}
            >
              {/* Drop cap on first paragraph */}
              {i === 0 ? (
                <>
                  <span
                    className="serif"
                    style={{
                      float: "left",
                      fontSize: "4.5rem",
                      lineHeight: 0.78,
                      marginRight: 8,
                      marginTop: 6,
                      color: "var(--espresso)",
                      fontWeight: 600,
                    }}
                  >
                    {para[0]}
                  </span>
                  {para.slice(1)}
                </>
              ) : (
                para
              )}
            </motion.p>
          ))}
        </div>

        {/* Tags row */}
        <motion.div
          initial={{opacity: 0}}
          whileInView={{opacity: 1}}
          transition={{duration: 0.5}}
          viewport={{once: true}}
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            marginTop: 56,
            marginBottom: 56,
            paddingTop: 40,
            borderTop: "1px solid rgba(28,10,0,0.08)",
          }}
        >
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Share row */}
        <motion.div
          initial={{opacity: 0, y: 16}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
          viewport={{once: true}}
          style={{
            padding: "36px 40px",
            background:
              "linear-gradient(135deg, rgba(193,125,60,0.06), rgba(28,10,0,0.03))",
            borderRadius: 24,
            border: "1px solid rgba(193,125,60,0.14)",
          }}
        >
          <p
            className="serif"
            style={{
              fontSize: "1.4rem",
              fontWeight: 600,
              color: "var(--espresso)",
              marginBottom: 6,
            }}
          >
            Did this story move you?
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(28,10,0,0.45)",
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            Share it with a fellow coffee lover.
          </p>
          <div style={{display: "flex", gap: 10, flexWrap: "wrap"}}>
            {[
              {label: "Twitter / X", color: "#1A1A1A"},
              {label: "Facebook", color: "#1877F2"},
              {label: "LinkedIn", color: "#0A66C2"},
            ].map((btn) => (
              <button
                key={btn.label}
                className="share-btn"
                style={{fontSize: "0.7rem"}}
              >
                {btn.label}
              </button>
            ))}
            <button
              className="share-btn"
              onClick={copyLink}
              style={{fontSize: "0.7rem"}}
            >
              {copied ? "✓ Link Copied" : "Copy Link"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* ══ RELATED STORIES ═════════════════════════════════════ */}
      {related.length > 0 && (
        <section
          style={{
            background:
              "linear-gradient(180deg, var(--cream) 0%, var(--bone) 100%)",
            padding: "96px 32px",
            borderTop: "1px solid rgba(193,125,60,0.1)",
          }}
        >
          <div style={{maxWidth: 1000, margin: "0 auto"}}>
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              viewport={{once: true}}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <div
                style={{width: 40, height: 1, background: "var(--caramel)"}}
              />
              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--caramel)",
                  fontWeight: 600,
                }}
              >
                Continue Reading
              </span>
            </motion.div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {related.map((relPost, i) => (
                <motion.div
                  key={relPost.id}
                  initial={{opacity: 0, y: 30}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.55, delay: i * 0.1}}
                  viewport={{once: true}}
                >
                  <Link to={`/blog/${relPost.id}`} className="related-card">
                    <div
                      style={{
                        height: 200,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={relPost.image}
                        alt={relPost.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "scale(1.06)")
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
                            "linear-gradient(to top, rgba(28,10,0,0.4), transparent 50%)",
                          pointerEvents: "none",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          background: "rgba(28,10,0,0.7)",
                          backdropFilter: "blur(8px)",
                          color: "var(--cream)",
                          padding: "4px 12px",
                          borderRadius: 60,
                          fontSize: "0.62rem",
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {relPost.category}
                      </div>
                    </div>
                    <div style={{padding: "22px 24px 28px"}}>
                      <h3
                        className="serif"
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 600,
                          color: "var(--espresso)",
                          lineHeight: 1.3,
                          letterSpacing: "-0.01em",
                          marginBottom: 10,
                        }}
                      >
                        {relPost.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "rgba(28,10,0,0.45)",
                          lineHeight: 1.6,
                          fontWeight: 300,
                          marginBottom: 16,
                        }}
                      >
                        {relPost.excerpt.slice(0, 90)}…
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: "var(--caramel)",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Read Story
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6h8M7 3l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ FOOTER CTA ══════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--espresso)",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{opacity: 0, y: 24}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.7}}
          viewport={{once: true}}
        >
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--caramel)",
              fontWeight: 600,
            }}
          >
            BrewHaven Roastery
          </span>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 600,
              color: "var(--cream)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "16px 0 32px",
            }}
          >
            Ready for your next great cup?
          </h2>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/#products" style={{textDecoration: "none"}}>
              <button
                style={{
                  background: "var(--caramel)",
                  color: "#fff",
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: 60,
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 30px rgba(193,125,60,0.35)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 12px 40px rgba(193,125,60,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(193,125,60,0.35)")
                }
              >
                Shop Our Blends
              </button>
            </Link>
            <Link to="/#blog" style={{textDecoration: "none"}}>
              <button
                style={{
                  background: "transparent",
                  color: "rgba(245,237,216,0.6)",
                  border: "1.5px solid rgba(245,237,216,0.2)",
                  padding: "15px 36px",
                  borderRadius: 60,
                  cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--cream)";
                  e.currentTarget.style.borderColor = "rgba(245,237,216,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,237,216,0.6)";
                  e.currentTarget.style.borderColor = "rgba(245,237,216,0.2)";
                }}
              >
                More Stories
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </article>
  );
};

export default BlogPost;
