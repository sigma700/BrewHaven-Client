import React, {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {TbCreditCard, TbLock, TbTruckDelivery} from "react-icons/tb";
import {useBasket} from "../store/stateFiles";
import {Link} from "react-router-dom";

const Checkout = () => {
  const {cart, getTotalItems, getTotalPrice, clearCart} = useBasket();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    paypalEmail: "",
    klarnaSSN: "",
    afterpayPhone: "",
    applePayEmail: "",
  });

  const paymentOptions = [
    {
      name: "Apple Pay",
      logo: "/apple-pay-svgrepo-com.svg",
      type: "apple",
    },
    {
      name: "Klarna",
      logo: "/klarna-logo-svgrepo-com.svg",
      type: "klarna",
    },
    {
      name: "PayPal",
      logo: "/paypal-svgrepo-com.svg",
      type: "paypal",
    },
    {
      name: "AfterPay",
      logo: "/brand-afterpay-svgrepo-com.svg",
      type: "afterpay",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    console.log("Order placed:", {...formData, paymentMethod: selectedPayment});
    clearCart();
  };

  const handlePaymentSelect = (paymentType) => {
    setSelectedPayment(paymentType);
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "apple":
        return (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
          >
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              Apple Pay
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Apple ID Email
                </label>
                <input
                  type="email"
                  name="applePayEmail"
                  value={formData.applePayEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@appleid.com"
                  required
                />
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-100">
                <p className="text-sm text-amber-700">
                  You'll be redirected to Apple Pay to complete your purchase
                  securely.
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "klarna":
        return (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
          >
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              Klarna
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Personal Identity Number (SSN)
                </label>
                <input
                  type="text"
                  name="klarnaSSN"
                  value={formData.klarnaSSN}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your SSN"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg border border-amber-100 text-center">
                  <p className="text-sm font-semibold text-amber-800">
                    Pay in 30 days
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-amber-100 text-center">
                  <p className="text-sm font-semibold text-amber-800">
                    Installments
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "paypal":
        return (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
          >
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              PayPal
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  PayPal Email
                </label>
                <input
                  type="email"
                  name="paypalEmail"
                  value={formData.paypalEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@paypal.com"
                  required
                />
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-100">
                <p className="text-sm text-amber-700">
                  You'll be redirected to PayPal to complete your payment.
                </p>
              </div>
            </div>
          </motion.div>
        );

      case "afterpay":
        return (
          <motion.div
            initial={{opacity: 0, height: 0}}
            animate={{opacity: 1, height: "auto"}}
            exit={{opacity: 0, height: 0}}
            transition={{duration: 0.3}}
            className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200"
          >
            <h3 className="text-lg font-semibold text-amber-900 mb-4">
              AfterPay
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="afterpayPhone"
                  value={formData.afterpayPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-100">
                <p className="text-sm text-amber-700">
                  Pay in 4 interest-free installments. First payment due today.
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

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
              Checkout
            </h1>
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-2xl mx-auto">
              <div className="flex justify-center">
                <img
                  src="/shopping-cart (1).svg"
                  className="text-6xl mb-4 lg:w-[300px] w-[100px]"
                  alt="Empty cart"
                />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Add some items to your cart before checking out!
              </p>
              <Link
                to="/#products"
                className="bg-amber-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors duration-300"
              >
                Continue Shopping
              </Link>
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
            Checkout
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Complete your order with confidence
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                    Contact Information
                  </h2>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                    Shipping Address
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 font-medium">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                    Payment Method
                  </h2>

                  {/* Payment Options */}
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">
                      Choose your payment method
                    </p>
                    <ul className="flex justify-between gap-4 m-[10px]">
                      {paymentOptions.map((item) => (
                        <motion.button
                          key={item.type}
                          type="button"
                          className={`flex-1 rounded-2xl p-[10px] shadow-xl hover:cursor-pointer transition-all duration-300 ${
                            selectedPayment === item.type
                              ? "bg-amber-200 scale-95 border-2 border-amber-500"
                              : "bg-white hover:scale-95"
                          }`}
                          whileHover={{scale: 0.95}}
                          whileTap={{scale: 0.9}}
                          onClick={() => handlePaymentSelect(item.type)}
                        >
                          <img
                            className="w-full max-w-[80px] mx-auto"
                            src={item.logo}
                            alt={item.name}
                          />
                        </motion.button>
                      ))}
                    </ul>
                  </div>

                  {/* Dynamic Payment Form */}
                  <AnimatePresence>{renderPaymentForm()}</AnimatePresence>

                  {/* Credit Card Form (shown when no payment method selected) */}
                  {!selectedPayment && (
                    <motion.div
                      initial={{opacity: 0}}
                      animate={{opacity: 1}}
                      className="space-y-4"
                    >
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 pr-12 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                          <TbCreditCard className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2 font-medium">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-semibold text-amber-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({getTotalItems()})</span>
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

                <button
                  onClick={handleSubmit}
                  className="w-full bg-amber-800 text-white py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors duration-300 shadow-lg hover:shadow-xl mb-4 flex items-center justify-center gap-2"
                >
                  <TbLock className="text-lg" />
                  Place Order
                </button>

                <Link
                  to="/cart"
                  className="w-full border border-amber-800 text-amber-800 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors duration-300 text-center block"
                >
                  Back to Cart
                </Link>

                {/* Additional Info */}
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl">
                    <div className="flex items-center gap-3 text-amber-700 mb-2">
                      <TbTruckDelivery className="text-xl" />
                      <span className="font-semibold">Free Shipping</span>
                    </div>
                    <p className="text-sm text-amber-600">
                      Orders over $50 qualify for free shipping
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3 text-green-700 mb-2">
                      <TbLock className="text-xl" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Checkout;
