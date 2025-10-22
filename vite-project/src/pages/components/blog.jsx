import React from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";

// Sample blog data
const coffeeStories = [
  {
    id: 1,
    title: "Coffee Prices Surge to Record Highs - What's Next for 2026?",
    excerpt:
      "Arabica futures reached unprecedented levels of $4.41/lb, creating new challenges across the supply chain as prices remain consistently high.",
    image: "/market.jpg",
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
    image: "/defforest.jpg",
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
    image: "/ethiopia.jpg",
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
    image: "/french-rev.jpg",
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
    image: "/barista-sam.jpg",
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
    image: "/experiment.jpg",
    category: "History",
    readTime: "3 min read",
    date: "2025-10-12",
    source: "Cuisine Barista",
    fullContent:
      "In the 18th century, King Gustav III of Sweden believed that coffee was dangerous and caused health problems. To prove this, he conducted an experiment with convicted twins...",
    featured: false,
  },
];

// Animated background shapes
const AnimatedShapes = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute -top-10 -left-10 w-60 h-60 bg-amber-200/20 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-10 -right-10 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl"
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.4, 0.2, 0.4],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

// Blog Grid Component
const BlogGrid = () => {
  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative bg-gradient-to-b from-amber-50 to-amber-100 py-20 overflow-hidden">
      <AnimatedShapes />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          transition={{duration: 0.8}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">
            Coffee Chronicles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover fascinating stories from the world of coffee — from market
            insights to historical tales.
          </p>
        </motion.div>

        {/* Featured Stories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-amber-800 mb-8 text-center">
            Featured Stories
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {coffeeStories
              .filter((story) => story.featured)
              .map((story) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/blog/${story.id}`}>
                    <motion.div
                      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full border-2 border-amber-200"
                      whileHover={{y: -8}}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-64 object-cover"
                          whileHover={{scale: 1.1}}
                          transition={{duration: 0.6}}
                        />
                        <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {story.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors">
                          {story.title}
                        </h4>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {story.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-amber-600 font-semibold">
                            {story.source}
                          </span>
                          <motion.span
                            className="text-amber-700 font-semibold flex items-center gap-2"
                            whileHover={{x: 5}}
                          >
                            Read more →
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true}}
        >
          <h3 className="text-2xl font-bold text-amber-800 mb-8 text-center">
            More Stories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeStories
              .filter((story) => !story.featured)
              .map((story) => (
                <motion.div
                  key={story.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Link to={`/blog/${story.id}`}>
                    <motion.div
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col border border-amber-100"
                      whileHover={{y: -5}}
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={story.image}
                          alt={story.title}
                          className="w-full h-48 object-cover"
                          whileHover={{scale: 1.05}}
                          transition={{duration: 0.4}}
                        />
                        <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          {story.category}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                          <span>{story.date}</span>
                          <span>•</span>
                          <span>{story.readTime}</span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                          {story.title}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                          {story.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <span className="text-amber-600 text-sm font-medium">
                            {story.source}
                          </span>
                          <motion.span
                            className="text-amber-700 text-sm font-medium flex items-center gap-1"
                            whileHover={{x: 3}}
                          >
                            Read →
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogGrid;
