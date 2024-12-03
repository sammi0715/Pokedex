import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { fetchDigimonList } from "../utils/api";
function DigimonList() {
  const ITEMS_PER_PAGE = 20;
  const TOTAL_DIGIMON = 1460;
  const TOTAL_PAGES = Math.ceil(TOTAL_DIGIMON / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);
  const [digimon, setDigimon] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDigimonList(currentPage, ITEMS_PER_PAGE);
        setDigimon(data.content);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div>錯誤：{error}</div>;
  }
  return (
    <div className="bg-gradient-to-l-digimon">
      <header className="relative flex items-center py-4 px-6">
        <Link to="/" className="z-10">
          <FaHome className="w-8 h-8 cursor-pointer" />
        </Link>
        <h1 className="flex absolute inset-0 text-4xl text-center items-center justify-center">
          Digimon
        </h1>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {digimon.map((d) => (
          <li
            key={d.id}
            className="bg-white bg-opacity-75 shadow-md flex flex-col items-center justify-center p-4 mb-4 rounded"
          >
            <img src={d.image} alt={d.name} className="rounded" />
            <h1 className="text-gray-600 capitalize">{d.name}</h1>
            <p className="text-gray-400">#{d.id}</p>
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default DigimonList;
