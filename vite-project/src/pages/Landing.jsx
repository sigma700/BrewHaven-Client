import React from "react";
import {motion} from "framer-motion";
import {useBasket} from "../store/stateFiles";
import {Link} from "react-router-dom";

const content = [
  {
    url: "/src/assets/lekhashri-k-cTly5TvGnDU-unsplash.jpg",
    desc: "Got into our first contract as the best coffee breweries in the nation led by Thomas Shelby the standing CEO at that moment of greatness for us!",
    cssPos: "col-span-4 row-span-2 lg:h-[400px] object-cover w-full",
  },
  {
    url: "/src/assets/elin-melaas-ML_mP7oWLRk-unsplash.jpg",
    desc: "Every sip has a story behind it and this is the main area of focus.",
    cssPos: "lg:row-start-3",
  },
  {
    url: "/src/assets/anita-jankovic-gAnrjbnRcWM-unsplash.jpg",
    desc: "We don't disappoint as long as you become a loyal customer.",
    cssPos: "lg:row-start-3",
  },
  {
    url: "/src/assets/brandon-leclaire-GrWScBV6yg4-unsplash.jpg",
    desc: "Believe in us and let us deliver",
    cssPos: "lg:row-start-3",
  },
  {
    url: "/src/assets/pratik-prasad-JnVFfSwLWoc-unsplash.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, voluptatum commodi modi dolor incidunt, animi aut magnam unde a, ullam nam repellat qui. Dignissimos, amet inventore necessitatibus dolorum molestias eos!",
    cssPos: "lg:row-start-3",
  },
];

export const products = [
  {
    name: "Jumping Bean",
    price: "$24.99",
    description: "Rich and smooth with chocolate notes",
    image: "/erik-mclean-FL3NmWxw0ok-unsplash.jpg",
    id: 1,
  },
  {
    name: "White Coffee",
    price: "$19.99",
    description: "Strong and bold with earthy tones",
    image: "/khanh-nguyen-jaChzCAVaTU-unsplash.jpg",
    id: 2,
  },
  {
    name: "Feeling 18",
    price: "$29.99",
    description: "Floral and citrusy with bright acidity",
    image: "/lisanto-J73tNVo5oZM-unsplash.jpg",
    id: 3,
  },
  {
    name: "The Good Life",
    price: "$26.99",
    description: "Well-balanced with caramel sweetness",
    image: "/sara-dubler-2u7KhYAl24A-unsplash.jpg",
    id: 4,
  },
  {
    name: "Craffty Common",
    price: "$22.99",
    description: "Nutty and smooth with low acidity",
    image: "/tyler-d0ZOLC5ptNY-unsplash.jpg",
    id: 5,
  },
];

const Landing = () => {
  const {
    addToCart,
    removeFromCart,
    updateCart,
    updateQuantity,
    cart,
    getTotalItems,
    getTotalPrice,
    success,
    error,
    clearCart,
  } = useBasket();

  const handleAddToCart = (productId) => {
    addToCart(productId);

    // Optional: Show success message
    if (success) {
      console.log("Product added to cart!");
    }

    // Optional: Show error message
    if (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-cover bg-[url(/src/assets/alin-luna-lGl3spVIU0g-unsplash.jpg)] bg-fixed">
      <div className="bg-white/95 backdrop-blur-sm rounded-b-[40%] lg:rounded-b-[30%] shadow-2xl">
        <section className="p-6 lg:p-12 lg:flex flex-col lg:gap-32">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <p className="font-extrabold text-2xl lg:text-3xl text-amber-900">
              <a
                href="#home"
                className="hover:text-amber-700 transition-colors"
              >
                BrewHaven
              </a>
            </p>

            {/* Navigation Links */}
            <ul className="hidden lg:flex gap-8">
              {["Home", "About", "Products", "Blog", "Contacts"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-amber-800 font-medium transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Auth Buttons */}
            <div className="flex gap-3">
              <button className="px-6 py-2 border-2 border-amber-800 text-amber-800 font-bold rounded-full hover:bg-amber-800 hover:text-white transition-all duration-200">
                Login
              </button>
              <button className="px-6 py-2 bg-amber-800 text-white font-bold rounded-full hover:bg-amber-700 transition-all duration-200 shadow-lg">
                SignUp
              </button>
            </div>
          </nav>

          <button className="lg:hidden fixed top-6 right-6 z-50 p-2 bg-white rounded-full shadow-lg">
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-800"></div>
          </button>

          <section className="lg:flex justify-around">
            <div className="mt-16 lg:mt-0 max-w-2xl">
              <h3 className="text-lg lg:text-xl text-amber-600 mb-4 font-semibold">
                Life happens
                <span className="text-amber-800 font-bold">
                  BrewHaven's
                </span>{" "}
                coffee helps!
              </h3>

              <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Start your day fresh with our special offerings
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                Experience the perfect blend of rich aromas and exquisite
                flavors. Our carefully sourced beans and artisanal roasting
                process deliver a coffee experience that transforms your
                everyday moments.
              </p>

              <div className="flex gap-4">
                <a href="#about">
                  <button className="px-8 py-4 bg-amber-800 text-white font-bold rounded-full hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Discover More
                  </button>
                </a>
                <a href="#products">
                  <button className="px-8 py-4 border-2 border-amber-800 text-amber-800 font-bold rounded-full hover:bg-amber-50 transition-all duration-300">
                    View Menu
                  </button>
                </a>
              </div>
            </div>
            <div>
              <img
                className="w-full lg:max-h-[700px] rounded-2xl"
                src="/src/assets/julia-florczak-Y6O6PHJRQms-unsplash-Photoroom.png"
                alt=""
              />
            </div>
          </section>
        </section>
      </div>

      {/* About us section */}
      <div
        id="about"
        className="bg-gradient-to-t from-amber-900/10 to-transparent rounded-t-[100%] text-black lg:p-[30px] pt-16"
      >
        <h1 className="text-white font-extrabold text-center text-[30px] lg:text-[40px] mt-[20px]">
          About Us
        </h1>
        <div className="bg-white lg:flex lg:gap-[20px] items-center lg:mt-[20px] mt-[10px] lg:p-8 p-4">
          <img
            className="rounded-tl-[60%] rounded-tr-[40%] rounded-br-[30%] rounded-bl-[70%] w-full lg:w-[800px] lg:mt-[40px] mt-[20px]"
            src="/src/assets/pexels-streetwindy-4079749.jpg"
            alt="About BrewHaven"
          />
          <p className="text-black font-light text-[20px] mt-[10px] text-center lg:m-0 lg:text-[25px] lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ratione eaque molestias dignissimos fugit, doloremque reiciendis,
            cupiditate, illum corporis voluptate voluptatum. Reprehenderit
            placeat repellat vitae doloremque corrupti id aliquid aspernatur!
          </p>
        </div>

        {/* history section */}
        <div className="bg-white lg:p-8 p-4">
          <h3 className="text-[30px] font-bold text-amber-900 text-center lg:text-left">
            Brief History
          </h3>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
            {content.map((item, index) => (
              <div
                key={index}
                className={`${item.cssPos} lg:h-[500px] w-full relative overflow-hidden group border-white border-[3px] rounded-lg`}
              >
                <img
                  className="w-full h-full group-hover:opacity-[0.9] object-cover transition-transform duration-500 group-hover:scale-110"
                  src={item.url}
                  alt=""
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex items-center justify-center p-6">
                  <p className="text-white text-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:text-[16px] font-bold">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* products section */}
      <section
        id="products"
        className="relative bg-gradient-to-b from-amber-50 via-white to-amber-50 py-20 lg:py-28 overflow-hidden"
      >
        <div className="container mx-auto px-6 lg:px-12">
          {/* Title + Subtitle */}
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: "easeOut"}}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-amber-900 tracking-tight drop-shadow-sm">
              Our Products
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover our premium selection of carefully sourced and roasted
              coffee beans.
            </p>
          </motion.div>

          {/* Success/Error Messages */}
          {success && (
            <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center"
            >
              Product added to cart successfully!
            </motion.div>
          )}
          {/* TODO:IMPROVE THE UI OF THE SUCCESS AND ERROR MESSAGES */}
          {error && (
            <motion.div
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Product Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {products.map((product, index) => {
              // Check if product is in cart and get its quantity Tto avoid adding null objects to the cart
              const cartItem = cart.find((item) => item.id === product.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{opacity: 0, y: 50}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{duration: 0.6, delay: index * 0.1}}
                  className="group relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-amber-100 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute top-5 right-5 bg-gradient-to-r from-amber-800 to-amber-600 text-white px-4 py-1 rounded-full font-semibold shadow-md">
                      {product.price}
                    </div>

                    {/* Quantity Badge */}
                    {quantity > 0 && (
                      <div className="absolute top-5 left-5 bg-amber-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {quantity}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="flex-1 bg-amber-800 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:bg-amber-700 hover:shadow-lg"
                      >
                        Add to Cart
                      </button>

                      {quantity > 0 && (
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="px-4 bg-red-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    {quantity > 0 && (
                      <div className="flex items-center justify-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center hover:bg-amber-300"
                        >
                          -
                        </button>
                        <span className="font-semibold">Qty: {quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center hover:bg-amber-300"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="text-center mt-12">
            <Link to="/cart">
              <button className="text-white hover:bg-amber-100 hover:border-black hover:text-black hover:cursor-pointer hover:transition-colors hover:duration-[0.4s] duration-75 lg:p-4 px-6 rounded-2xl border bg-[#b57539] lg:text-2xl text-xl font-light">
                Your Cart: {getTotalItems()} items ($
                {getTotalPrice().toFixed(2)})
              </button>
            </Link>

            {/* clear cart button */}
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="ml-4 lg:p-4 px-6 rounded-2xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 text-lg font-light"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>

        <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-200/40 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/30 blur-3xl rounded-full"></div>
      </section>
    </main>
  );
};

export default Landing;
