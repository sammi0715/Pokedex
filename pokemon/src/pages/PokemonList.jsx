import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import pokeLogo from "../assets/poke-logo.png";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import PokemonDetailCard from "../components/PokemonDetailCard";
import { fetchPokemonDetails, fetchPokemonList } from "../utils/api";
import { typeColors } from "../utils/color-scheme";

function PokemonList() {
  const ITEMS_PER_PAGE = 20;
  const TOTAL_POKEMON = 1302;
  const TOTAL_PAGES = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);

  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSelectedPokemon, setLoadingSelectedPokemon] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);
      const details = await Promise.all(
        data.results.map(async (p) => {
          const id = extractPokemonId(p.url);
          const detailsData = await fetchPokemonDetails(id);
          return { id, types: detailsData.types.map((t) => t.type.name) };
        })
      );
      setPokemon(data.results);
      setPokemonDetails(Object.fromEntries(details.map((d) => [d.id, d.types])));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError({ message: "Data not found, please try again later!", type: "server" });
      } else if (err.message === "Network Error") {
        setError({
          message: "Network error, please check your internet connection!",
          type: "network",
        });
      } else {
        setError({
          message: "An unknown error occurred, please try again later!",
          type: "unknown",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [offset]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * ITEMS_PER_PAGE);
  };

  const extractPokemonId = (url) => {
    const idMatch = url.match(/\/pokemon\/(\d+)\//);
    return idMatch ? idMatch[1] : null;
  };

  const handlePokemonClick = async (pokemonName) => {
    try {
      const data = await fetchPokemonDetails(pokemonName);
      setSelectedPokemon(data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch Pokemon details", err);
      alert("無法載入寶可夢詳細資料，請稍後再試。");
    } finally {
      setLoadingSelectedPokemon(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-l-pokemon p-4">
      <header className="relative flex items-center justify-center py-4 px-6">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-50 absolute left-6  items-center flex justify-center rounded-full">
          <Link to="/" className="">
            <FaHome className="w-8 h-8 md:w-10 md:h-10 text-blue-700 hover:text-blue-900 cursor-pointer" />
          </Link>
        </div>
        <img src={pokeLogo} className="w-[150px] md:w-[300px]" alt="Pokemon Logo" />
      </header>
      {error ? (
        <ErrorMessage message={`Error：${error.message}`} onRetry={fetchData} type={error.type} />
      ) : loading ? (
        <Loading type="list" message="Gotta catch 'em all..." itemsPerPage={ITEMS_PER_PAGE} />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-12">
          {pokemon.map((p) => {
            const id = extractPokemonId(p.url);
            const types = pokemonDetails[id] || [];
            let backgroundColor = "#fff";

            if (types.length > 0) {
              if (types[0] === "normal" && types.length > 1) {
                backgroundColor = typeColors[types[1]];
              } else {
                backgroundColor = typeColors[types[0]];
              }
            }
            return (
              <li
                key={p.name}
                className="bg-white bg-opacity-50 shadow-md flex flex-col p-4 mb-4 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handlePokemonClick(p.name)}
              >
                <p className="text-gray-400 text-right">#{id}</p>
                <div
                  style={{
                    backgroundColor,
                  }}
                  className="p-2 rounded-full"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                    alt={p.name}
                    className="p-4 bg-white bg-opacity-60 rounded-full"
                  />
                </div>
                <h1 className="text-gray-600 text-center mt-2 capitalize">{p.name}</h1>
              </li>
            );
          })}
        </ul>
      )}
      <PokemonDetailCard isOpen={isModalOpen} onClose={closeModal} pokemon={selectedPokemon} />
      <div className="bottom-0">
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
export default PokemonList;
