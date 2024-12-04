import React from "react";
import { MdCatchingPokemon } from "react-icons/md";
const Loading = ({ itemsPerPage = 20 }) => {
  return (
    <div className="relative min-h-screen">
      <ul
        className="grid gap-4 p-4 
          grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  
          
        "
      >
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <li
            key={index}
            className="bg-gray-200 shadow-md flex flex-col p-4 rounded-xl items-center animate-pulse h-[250px] max-w-[150px] md:max-w-[200px] mx-auto"
          >
            <div className="bg-gray-300 rounded-full h-32 w-32 md:h-40 md:w-40"></div>
          </li>
        ))}
      </ul>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <MdCatchingPokemon
          className="w-28 h-28 mb-6 animate-spin-color-change"
          style={{ transformOrigin: "center" }}
        />

        <p className="text-2xl ">Catching...</p>
      </div>
    </div>
  );
};

export default Loading;
