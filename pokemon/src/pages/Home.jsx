import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/banner.jpeg";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-l-home justify-between">
      <header className="text-center py-8">
        <h1 className="text-5xl font-bold text-white">Pokedex</h1>
      </header>

      <section className="flex-grow">
        <img src={Banner} alt="Banner" className="w-full h-auto object-cover shadow-lg" />
      </section>

      <div className="text-center py-8 space-x-4">
        <p className="text-lg text-white mb-2">Explore Pokémon and Digimon</p>
        <Link to="/pokemon">
          <button className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-300 transition">
            Pokémon
          </button>
        </Link>
        <Link to="/digimon">
          <button className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-400 transition">
            Digimon
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
