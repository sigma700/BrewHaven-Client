import React from "react";

const content = [
  {
    url: "/src/assets/lekhashri-k-cTly5TvGnDU-unsplash.jpg",
    desc: "Got into our first conract as the best coffee breweries in the nation aled by Thomas Shelby the standing CEO at that moment of greatness for us !",
    cssPos: "col-span-4 row-span-2 lg:h-[400px] object-cover w-full",
  },
  {
    url: "/src/assets/elin-melaas-ML_mP7oWLRk-unsplash.jpg",
    desc: "Every sip has a story behind it and this is the main area of focus.",
    cssPos: "row-start-3",
  },
  {
    url: "/src/assets/anita-jankovic-gAnrjbnRcWM-unsplash.jpg",
    desc: "We don't dissapoint as long as you become a loyal customer.",
    cssPos: "row-start-3",
  },
  {
    url: "/src/assets/brandon-leclaire-GrWScBV6yg4-unsplash.jpg",
    desc: "Believe in us and let us deliver",
    cssPos: "row-start-3",
  },
  {
    url: "/src/assets/pratik-prasad-JnVFfSwLWoc-unsplash.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, voluptatum commodi modi dolor incidunt, animi aut magnam unde a, ullam nam repellat qui. Dignissimos, amet inventore necessitatibus dolorum molestias eos!",
    cssPos: "row-start-3",
  },
];

const Landing = () => {
  return (
    <main className="min-h-screen bg-cover bg-[url(/src/assets/alin-luna-lGl3spVIU0g-unsplash.jpg)] bg-fixed">
      <div className="min-h-screen bg-white/95 backdrop-blur-sm rounded-b-[40%] lg:rounded-b-[30%] shadow-2xl">
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

            {/* Navigation Links with good responsiveness fam */}
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
                <button className="px-8 py-4 border-2 border-amber-800 text-amber-800 font-bold rounded-full hover:bg-amber-50 transition-all duration-300">
                  View Menu
                </button>
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
        className="h-32 bg-gradient-to-t from-amber-900/10 to-transparent rounded-t-[100%] text-black lg:p-[30px]"
      >
        <h1 className="text-white font-extrabold text-center lg:text-[40px] mt-[20px]">
          About Us
        </h1>
        <div className="bg-white lg:flex lg:gap-[20px] items-center lg:mt-[20px]">
          <img
            className="rounded-tl-[60%] rounded-tr-[40%] rounded-br-[30%] rounded-bl-[70%] w-[800px] lg:mt-[40px]"
            src="/src/assets/pexels-streetwindy-4079749.jpg"
            alt=""
          />
          <p className="text-black font-light text-[25px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            ratione eaque molestias dignissimos fugit, doloremque reiciendis,
            cupiditate, illum corporis voluptate voluptatum. Reprehenderit
            placeat repellat vitae doloremque corrupti id aliquid aspernatur!
          </p>
        </div>

        {/* history section */}

        <h3 className="text-[30px] font-bold text  text-amber-900">
          Brief History
        </h3>
        <div className="grid lg:grid-cols-4">
          {content.map((item, index) => (
            <div
              key={index}
              className={`${item.cssPos} lg:h-[500px] w-full relative overflow-hidden group border-white border-[3px]`}
            >
              <img
                className="w-full h-full group-hover:opacity-[0.9] object-cover transition-transform duration-500 group-hover:scale-110"
                src={item.url}
                alt=""
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-500 flex items-center justify-center p-6">
                <p className="text-white text-center transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 lg:text-[20px] font-bold">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* products section */}
      <section>
        <div></div>
      </section>
    </main>
  );
};
//this is the main area of focus and this is the main area of focus and should be making alot of sense fam remember practice makes perfect
export default Landing;
