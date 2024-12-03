import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { fetchPokemonDetails, fetchPokemonList } from "../utils/api";
function PokemonList() {
  const ITEMS_PER_PAGE = 20;
  const TOTAL_POKEMON = 1302;
  const TOTAL_PAGES = Math.ceil(TOTAL_POKEMON / ITEMS_PER_PAGE);

  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState({});
  const [error, setError] = useState(null);
  const typeColors = {
    normal: "#c2c2a1",
    fire: "#fb6c6c",
    water: "#609fb5",
    electric: "#ffd86f",
    grass: "#48d0b0",
    ice: "#7fccec",
    fighting: "#d6b591",
    poison: "#7c538c",
    ground: "#b1736c",
    flying: "#bab0d5",
    psychic: "#9b7fa6",
    bug: "#c3ce75",
    rock: "#a6aab6",
    ghost: "#7c538c",
    dragon: "#f9be00",
    dark: "#333333",
    steel: "#ccccde",
    fairy: "#f469a9",
  };

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
          return (
            <li
              key={p.name}
              className="bg-white bg-opacity-50 shadow-md flex flex-col p-4 mb-4 rounded-xl"
            >
              <p className="text-gray-400 text-right">#{id}</p>
              <div
                style={{
                  backgroundColor: pokemonDetails[id] ? typeColors[pokemonDetails[id][0]] : "#fff",
                }}
                className="p-2 bg-red-200 rounded-full"
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
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default PokemonList;
