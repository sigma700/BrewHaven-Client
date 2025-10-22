import React from "react";
import {motion} from "framer-motion";
import {Link, useParams} from "react-router-dom";

// This would typically come from an API or database
const coffeeStories = [
  {
    id: 1,
    title: "Coffee Prices Surge to Record Highs - What's Next for 2026?",
    excerpt:
      "Arabica futures reached unprecedented levels of $4.41/lb, creating new challenges across the supply chain as prices remain consistently high.",
    image: "/public/market.jpg",
    category: "Market Trends",
    readTime: "4 min read",
    date: "2025-10-22",
    source: "Perfect Daily Grind",
    fullContent:
      "Sustained high green coffee prices have been a defining factor of the coffee industry in 2025. Climate change, political instability, tariffs, and global economic pressures are adding layers of complexity...",
    featured: true,
  },
  {
    id: 2,
    title: "Deforestation Imperils Coffee Production in Brazil",
    excerpt:
      "New research reveals how forest clearing for coffee farms reduces rainfall and threatens long-term crop viability.",
    image: "/public/defforest.jpg",
    category: "Sustainability",
    readTime: "5 min read",
    date: "2025-10-22",
    source: "The New York Times",
    fullContent:
      "Every day, we drink more than two billion cups of coffee worldwide. To grow beans to quench this thirst, ever more forests have been felled globally for farming...",
    featured: true,
  },
  {
    id: 3,
    title: "The Dancing Goats: Ethiopia's Coffee Discovery Legend",
    excerpt:
      "How a 9th-century goatherd named Kaldi discovered coffee's energizing effects through his lively goats.",
    image: "/public/ethiopia.jpg",
    category: "History",
    readTime: "3 min read",
    date: "2025-10-20",
    source: "Cuisine Barista",
    fullContent:
      "One of the most well-known legends about coffee comes from Ethiopia. According to the legend, the goatherd Kaldi discovered coffee beans in the 9th century...",
    featured: false,
  },
  {
    id: 4,
    title: "Coffee Houses Fueled the French Revolution",
    excerpt:
      "How Parisian cafés became breeding grounds for revolutionary ideas and political change in 18th century France.",
    image: "/public/french-rev.jpg",
    category: "Culture",
    readTime: "4 min read",
    date: "2025-10-18",
    source: "Cuisine Barista",
    fullContent:
      "In France, coffee houses played a crucial role in the French Revolution. In 1789, at the famous Café de Foy, journalist Camille Desmoulins gave a fiery speech...",
    featured: false,
  },
  {
    id: 5,
    title: "Australia's Jack Simpson Crowned 2025 World Barista Champion",
    excerpt:
      "After remarkable back-to-back performances, Simpson claims the top prize in international coffee competition.",
    image: "/public/barista-sam.jpg",
    category: "Industry News",
    readTime: "3 min read",
    date: "2025-10-15",
    source: "Daily Coffee News",
    fullContent:
      "Australia's Jack Simpson was crowned the 2025 World Barista Champion today, capping a remarkable competition run that included a runner-up WBC finish in 2024...",
    featured: false,
  },
  {
    id: 6,
    title: "The Swedish King's Failed Coffee Experiment",
    excerpt:
      "How Gustav III's attempt to prove coffee's dangers backfired spectacularly in the 18th century.",
    image: "/public/experiment.jpg",
    category: "History",
    readTime: "3 min read",
    date: "2025-10-12",
    source: "Cuisine Barista",
    fullContent:
      "In the 18th century, King Gustav III of Sweden believed that coffee was dangerous and caused health problems. To prove this, he conducted an experiment with convicted twins...",
    featured: false,
  },
];

const BlogPost = () => {
  const {id} = useParams();
  const post = coffeeStories.find((story) => story.id === parseInt(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Story Not Found
          </h1>
          <Link
            to="/"
            className="text-amber-700 hover:text-amber-800 font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.6}}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-white"
    >
      {/* Navigation of the page */}
      <nav className="bg-white/80 backdrop-blur-sm py-4 border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <Link
            to="/#blog"
            className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors"
          >
            ← Back to all stories
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <div className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{y: 30, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.8}}
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-500 text-sm">•</span>
              <span className="text-gray-500 text-sm">{post.readTime}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 justify-center">
              <span className="font-semibold">{post.source}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Featured Image */}
      <motion.div
        initial={{scale: 0.95, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        transition={{duration: 0.8, delay: 0.2}}
        className="container mx-auto px-6 max-w-4xl mb-12"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 lg:h-96 object-cover rounded-2xl shadow-xl"
        />
      </motion.div>

      {/* Article Content */}
      <motion.div
        initial={{y: 30, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.4}}
        className="container mx-auto px-6 max-w-3xl pb-20"
      >
        <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-amber-600 hover:prose-a:text-amber-700">
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {post.excerpt}
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            {post.fullContent}
          </p>
          <p className="text-gray-700 leading-relaxed">
            The coffee industry continues to evolve with these market dynamics,
            creating both challenges and opportunities for producers, roasters,
            and consumers alike.
          </p>
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Share this story
          </h3>
          <div className="flex gap-4">
            <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
              Twitter
            </button>
            <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
              Facebook
            </button>
            <button className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg hover:bg-amber-200 transition-colors">
              LinkedIn
            </button>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default BlogPost;
