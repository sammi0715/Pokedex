import React from "react";
import { MdCatchingPokemon } from "react-icons/md";
import pokeball from "../assets/pokeball.png";

const Loading = ({ type = "list", message = "Loading...", itemsPerPage = 20 }) => {
  if (type === "list") {
    return (
      <div className="relative min-h-screen">
        <ul className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <li
              key={index}
              className="bg-gray-200 shadow-md flex flex-col p-4 rounded-xl items-center animate-pulse 
              h-[250px] max-w-[150px] md:max-w-[200px] mx-auto"
            >
              <div className="bg-gray-300 rounded-full h-32 w-32 md:h-40 md:w-40"></div>
            </li>
          ))}
        </ul>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
          <img src={pokeball} alt="pokeball" className="w-28 h-28 mb-6 animate-spin" />
          <p className="text-2xl">{message}</p>
        </div>
      </div>
    );
  } else if (type === "indicator") {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl relative w-[85%] h-[80%] md:w-[600px] md:h-[650px] flex items-center justify-center">
          <div className="flex justify-center items-center h-full">
            <span>
              <MdCatchingPokemon className="animate-spin w-20 h-20" />
              <p className="text-center mt-2">Catching ...</p>
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
