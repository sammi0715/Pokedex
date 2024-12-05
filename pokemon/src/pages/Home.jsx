import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import bgpokedigi from "../assets/poke-digi.png";
import MarqueeBackground from "../components/MarqueeBackground";
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-l-home flex flex-col relative">
      <MarqueeBackground />

      <header className="z-10 text-center py-8 flex items-center justify-center">
        <img src={Logo} className="w-[400px] md:w-[600px] lg:w-[800px] h-auto" alt="Logo" />
      </header>

      <div className="z-10 flex flex-col md:flex-row items-center justify-between max-w-screen-xl lg:max-w-screen-2xl px-4 w-full mx-auto">
        <div className="flex flex-col w-full md:w-1/2 lg:w-[45%] text-center md:text-left px-4 md:px-6 lg:px-4 z-20">
          <p className="text-2xl md:text-4xl lg:text-4xl font-bold text-black mb-8 md:mb-12 animate-fade-in lg:whitespace-nowrap">
            Explore Pokémon and Digimon
          </p>
          <div className="flex justify-center md:justify-start items-center gap-4">
            <Link to="/pokemon">
              <button className="bg-red-500 text-white text-xl md:text-2xl lg:text-3xl py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-2xl shadow-md hover:bg-yellow-300 transition">
                Pokémon
              </button>
            </Link>
            <Link to="/digimon">
              <button className="bg-orange-400 text-white text-xl md:text-2xl lg:text-3xl py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-2xl shadow-md hover:bg-yellow-400 transition">
                Digimon
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-[55%] flex justify-center items-center mt-8 md:mt-0">
          <img
            src={bgpokedigi}
            className="w-[80%] md:w-full lg:w-[90%] h-auto object-contain"
            alt="Dragon"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
