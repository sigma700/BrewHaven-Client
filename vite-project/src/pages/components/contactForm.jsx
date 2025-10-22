import React, {useState} from "react";
import {motion} from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Information */}
          <motion.div
            initial={{opacity: 0, x: -50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
            className="text-center lg:text-left"
          >
            <motion.h2
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.2}}
              className="text-5xl lg:text-6xl font-bold text-amber-900 mb-6"
            >
              Let's Talk to you
            </motion.h2>

            <motion.p
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.4}}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Have questions about our coffee? Want to share your experience?
              We'd love to hear from you. Get in touch with our team.
            </motion.p>

            {/* Contact Info Cards */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.6}}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <img src="/mail.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <p className="text-amber-700">business@brewhaven.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <img src="/smartphone.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Phone</h3>
                  <p className="text-amber-700">+1 (555) 123-BREW</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <img src="/map-pin.svg" alt="" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-amber-700">72 W 38th St, New York</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{opacity: 0, x: 50}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.8}}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
          >
            <motion.h3
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              transition={{duration: 0.6, delay: 0.3}}
              className="text-3xl font-bold text-amber-900 mb-8 text-center"
            >
              CONTACT US
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.4}}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  FULL NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 outline-none text-lg"
                  required
                />
              </motion.div>

              {/* Email Address Field */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.5}}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 outline-none text-lg"
                  required
                />
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.6}}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  YOUR MESSAGE
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message here"
                  rows="6"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 outline-none resize-none text-lg"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.7}}
                className="pt-4"
              >
                <motion.button
                  type="submit"
                  whileHover={{scale: 1.02}}
                  whileTap={{scale: 0.98}}
                  className="w-full bg-amber-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-amber-700 transition-colors duration-300"
                >
                  Send Message
                </motion.button>
              </motion.div>
            </form>

            {/* Additional Info */}
            <motion.div
              initial={{opacity: 0}}
              whileInView={{opacity: 1}}
              transition={{duration: 0.6, delay: 0.9}}
              className="mt-8 text-center text-gray-500 text-sm"
            >
              <p>We typically respond within 24 hours</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl"
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
          className="absolute bottom-10 -right-10 w-96 h-96 bg-amber-300/15 rounded-full blur-3xl"
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
    </section>
  );
};

export default ContactForm;
