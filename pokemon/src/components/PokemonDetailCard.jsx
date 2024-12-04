import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { fetchAndProcessPokemonEvolutionChain, fetchPokemonSpecies } from "../utils/api";
import { typeColors } from "../utils/color-scheme";
function PokemonDetailCard({ isOpen, onClose, pokemon }) {
  if (!isOpen || !pokemon) return null;
  const [activeTab, setActiveTab] = useState("about");
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [error, setError] = useState(null);
  const primaryType = pokemon.types?.[0]?.type?.name || "normal";
  const backgroundColor = typeColors[primaryType] || "#fff";
  useEffect(() => {
    if (activeTab === "evolution") {
      const fetchEvolution = async () => {
        try {
          const speciesData = await fetchPokemonSpecies(pokemon.id);
          const chain = await fetchAndProcessPokemonEvolutionChain(speciesData.evolution_chain.url);

          setEvolutionChain(chain);
        } catch (err) {
          setError("Failed to fetch evolution chain");
        }
      };

      fetchEvolution();
    }
  }, [activeTab, pokemon]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div
        style={{ backgroundColor }}
        className="bg-white rounded-2xl shadow-xl relative w-[85%] h-[80%] md:w-[600px] md:h-[650px] flex flex-col items-center"
      >
        <FaArrowLeft className="absolute left-2 top-4 w-6 h-6" onClick={onClose} />
        <h2 className="text-3xl capitalize text-center mt-8">{pokemon.name}</h2>
        <span className="text-3xl text-right text-white text-opacity-50 absolute top-5 right-5">
          #{pokemon.id}
        </span>
        <div className="flex justify-center mt-4 space-x-2 relative">
          {pokemon.types?.map((t) => (
            <span
              key={t.type.name}
              className="px-2 py-1 bg-white bg-opacity-30 text-white text-sm rounded-full tracking-wide"
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <div className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 z-20">
          <img
            src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
            alt={pokemon.name}
            className="w-48 h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 mx-auto"
          />
        </div>

        <div className="mt-4 p-4 lg:p-8 w-full h-full  text-center bg-white shadow-2xl rounded-2xl z-10 overflow-y-auto">
          <div className="flex justify-around border-b">
            <button
              className={`py-2 px-4 ${
                activeTab === "about"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "stats"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("stats")}
            >
              Base Stats
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "evolution"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("evolution")}
            >
              Evolution
            </button>
          </div>
          {/* //About section */}
          {activeTab === "about" && (
            <div className="p-4">
              <table className="w-full text-left">
                <tbody>
                  <tr>
                    <th className="py-2 pr-4 text-gray-600">Species</th>
                    <td className="py-2 text-gray-800 capitalize">
                      {pokemon.types?.map((t) => t.type.name).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-gray-600">Height</th>
                    <td className="py-2 text-gray-800">{(pokemon.height * 10).toFixed(0)} cm</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-gray-600">Weight</th>
                    <td className="py-2 text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</td>
                  </tr>
                  <tr>
                    <th className="py-2 pr-4 text-gray-600">Abilities</th>
                    <td className="py-2 text-gray-800 capitalize">
                      {pokemon.abilities?.map((a) => a.ability.name).join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/*  Base stats section */}
          {activeTab === "stats" && (
            <div className="p-4">
              <table className="w-full text-left">
                <tbody>
                  {pokemon.stats?.map((s) => (
                    <tr key={s.stat.name} className="h-12">
                      <th className="pr-4 text-gray-600 capitalize w-[20%]">{s.stat.name}</th>

                      <td className="text-gray-800 w-[10%]">{s.base_stat}</td>

                      <td className="w-full">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            style={{ width: `${(s.base_stat / 100) * 100}%` }}
                            className={`h-full rounded-full ${
                              s.base_stat > 100 ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Evolution section */}
          {activeTab === "evolution" && (
            <div className="p-4 w-full bg-white rounded-b-lg">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div>
                  <h3 className="text-lg text-gray-600 mb-6 text-center">Evolution Chain</h3>
                  <div className="flex items-center justify-center space-x-2 md:space-x-6">
                    {evolutionChain.map((evo, index) => (
                      <div key={evo.name} className="flex items-center space-x-2 md:space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 md:w-20 md:h-20">
                            <img
                              src={evo.image}
                              alt={evo.name}
                              style={{
                                aspectRatio: "1 / 1",
                              }}
                              className=" rounded-full border-2 border-gray-300"
                            />
                          </div>

                          <p className="capitalize mt-2 text-gray-600 text-sm md:text-base">
                            {evo.name}
                          </p>
                        </div>

                        {index < evolutionChain.length - 1 && (
                          <div className="flex flex-col items-center space-y-1">
                            <span className="text-gray-500 text-2xl">→</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PokemonDetailCard;
