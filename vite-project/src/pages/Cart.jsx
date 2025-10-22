import React from "react";
import {useBasket} from "../store/stateFiles";
import {motion} from "framer-motion";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useBasket();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6}}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-6">
              Your Shopping Cart
            </h1>
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
              <div className="flex justify-center">
                <img
                  src="/shopping-cart.svg"
                  className="text-6xl mb-4 lg:w-[300px] w-[100px]"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Let's go back and do some actual shopping !
              </p>
              <a
                href="/#products"
                className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Continue Shopping
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.6}}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 text-center mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 text-center mb-8">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items that are supposed to be put into the cart */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900">
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{opacity: 0, x: -20}}
                      animate={{opacity: 1, x: 0}}
                      transition={{duration: 0.5, delay: index * 0.1}}
                      className="flex flex-col lg:flex-row gap-4 p-4 border border-amber-100 rounded-2xl hover:shadow-md transition-shadow duration-300"
                    >
                      {/*Image of the code */}
                      <div className="lg:w-32 lg:h-32 w-full h-48 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/*Details of the products */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-amber-900">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1"
                          >
                            ✕
                          </button>
                        </div>

                        <p className="text-gray-600 mb-3 text-sm">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-amber-800">
                              {item.price}
                            </span>
                            <div className="flex items-center gap-2 bg-amber-100 rounded-full px-3 py-1">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-amber-200 transition-colors duration-200"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="font-semibold text-amber-900 min-w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-amber-200 transition-colors duration-200"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-lg font-bold text-amber-900">
                              $
                              {(
                                parseFloat(item.price.replace("$", "")) *
                                item.quantity
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  <hr className="border-amber-200" />
                  <div className="flex justify-between text-xl font-bold text-amber-900">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-amber-800 text-white py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl mb-4">
                  Proceed to Checkout
                </button>

                <a
                  href="/#products"
                  className="w-full border border-amber-800 text-amber-800 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors duration-300 text-center block"
                >
                  Continue Shopping
                </a>

                {/* Additional Info about the product*/}
                <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-3 text-amber-700 mb-2">
                    <span>🚚</span>
                    <span className="font-semibold">Free Shipping</span>
                  </div>
                  <p className="text-sm text-amber-600">
                    Orders over $50 qualify for free shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Cart;
