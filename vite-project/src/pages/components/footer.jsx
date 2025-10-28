import React from "react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {FiFacebook, FiInstagram, FiLinkedin, FiTwitter} from "react-icons/fi";
import {FaLocationDot} from "react-icons/fa6";

import {CiHeadphones, CiMail} from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-amber-900 to-amber-950 text-white overflow-hidden">
      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-24"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#footerGradient)"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,85.3C960,85,1056,75,1152,74.7C1248,75,1344,85,1392,90.7L1440,96V0H0Z"
          />
          <defs>
            <linearGradient id="footerGradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-800/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-10 -right-20 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 py-16">
          {/* Brand Column */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="lg:col-span-1"
          >
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-3xl font-bold text-amber-100">BrewHaven</h2>
            </Link>
            <p className="text-amber-200/80 leading-relaxed mb-6">
              Crafting exceptional coffee experiences since 2010. We bring you
              the finest beans from around the world, roasted to perfection for
              your daily moments of joy.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  name: "Facebook",
                  icon: <FiFacebook />,
                  path: "#",
                },
                {
                  name: "Twitter",
                  icon: <FiTwitter />,
                  path: "#",
                },
                {
                  name: "Instagram",
                  icon: <FiInstagram />,
                  path: "#",
                },
                {
                  name: "LinkedIn",
                  icon: <FiLinkedin />,
                  path: "#",
                },
              ].map((social, index) => (
                <motion.a
                  target="blank"
                  key={index}
                  href={social.path}
                  whileHover={{scale: 1.1, y: -2}}
                  className="w-10 h-10 bg-amber-800/50 rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-amber-700 transition-colors duration-300"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.1}}
          >
            <h3 className="text-lg font-semibold text-amber-100 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Products", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={`#${link.toLowerCase()}`}
                    className="text-amber-200/80 hover:text-amber-100 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.2}}
          >
            <h3 className="text-lg font-semibold text-amber-100 mb-6">
              Our Products
            </h3>
            <ul className="space-y-3">
              {[
                "Jumping Bean Blend",
                "White Coffee Premium",
                "Feeling 18 Roast",
                "The Good Life Blend",
                "Craffty Common",
              ].map((product) => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-amber-200/80 hover:text-amber-100 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-600 rounded-full mr-3 group-hover:bg-amber-400 transition-colors duration-300"></span>
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, delay: 0.3}}
          >
            <h3 className="text-lg font-semibold text-amber-100 mb-6">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-xs">
                    <FaLocationDot />
                  </span>
                </div>
                <p className="text-amber-200/80">72 W 38th St, New York</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">
                    <CiHeadphones />
                  </span>
                </div>
                <p className="text-amber-200/80">+1 (555) 123-BREW</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">
                    <CiMail />
                  </span>
                </div>
                <p className="text-amber-200/80">business@brewhaven.com</p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-amber-100 mb-3">
                Newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-amber-800/50 border border-amber-700 rounded-l-lg text-amber-100 placeholder-amber-300/60 focus:outline-none focus:border-amber-500"
                />
                <motion.button
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-r-lg transition-colors duration-300"
                >
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-800/50 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.6, delay: 0.4}}
              className="text-amber-300/70 text-sm text-center lg:text-left"
            >
              <p>
                &copy; {currentYear} BrewHaven Coffee Co. All rights reserved.
              </p>
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.6, delay: 0.5}}
              className="flex flex-wrap justify-center space-x-6 text-sm"
            >
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Shipping Policy",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-amber-300/70 hover:text-amber-200 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </motion.div>

            {/* Special Thanks - Creator Credit */}
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.6, delay: 0.6}}
              className="text-center lg:text-right"
            >
              <p className="text-amber-400/80 text-sm">
                Crafted with ❤️ by{" "}
                <span className="font-semibold text-amber-300">
                  Allan Muriithi Kirimi
                </span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Decorative Coffee Beans */}
        <div className="absolute bottom-4 right-8 opacity-10">
          <div className="flex space-x-2">
            {["☕", "🌱", "🔥", "✨"].map((icon, index) => (
              <motion.span
                key={index}
                animate={{y: [0, -5, 0]}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
                className="text-2xl"
              >
                {icon}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Optimized Curves */}
      <div className="lg:hidden absolute -top-8 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-amber-900 rounded-b-[80%]"></div>
    </footer>
  );
};

export default Footer;
