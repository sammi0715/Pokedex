import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonList(ITEMS_PER_PAGE, offset);

        setPokemon(data.results);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [offset]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          pokemon.map(async (p) => {
            const id = extractPokemonId(p.url);
            const data = await fetchPokemonDetails(id);
            return { id, types: data.types.map((t) => t.type.name) };
          })
        );
        const detailsMap = Object.fromEntries(details.map((d) => [d.id, d.types]));
        setPokemonDetails(detailsMap);
      } catch (err) {
        console.error(err);
      }
    };
    if (pokemon.length > 0) {
      fetchDetails();
    }
  }, [pokemon]);

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
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  if (error) {
    return <div>錯誤：{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-l-pokemon p-4">
      <header className="relative flex items-center py-4 px-6">
        <Link to="/" className="z-10">
          <FaHome className="w-8 h-8 cursor-pointer" />
        </Link>

        <h1 className="flex absolute inset-0 text-4xl text-center items-center justify-center">
          Pokémon
        </h1>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-12">
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
              className="bg-white bg-opacity-50 shadow-md flex flex-col p-4 mb-4 rounded-xl"
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
                  onClick={() => handlePokemonClick(p.name)}
                />
              </div>
              <h1 className="text-gray-600 text-center mt-2 capitalize">{p.name}</h1>
            </li>
          );
        })}
      </ul>
      <PokemonDetailCard isOpen={isModalOpen} onClose={closeModal} pokemon={selectedPokemon} />
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default PokemonList;
