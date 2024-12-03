import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { fetchDigimonDetails, fetchDigimonList } from "../utils/api";
import { attributeColors } from "../utils/color-scheme";
function DigimonList() {
  const ITEMS_PER_PAGE = 20;
  const TOTAL_DIGIMON = 1460;
  const TOTAL_PAGES = Math.ceil(TOTAL_DIGIMON / ITEMS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);
  const [digimon, setDigimon] = useState([]);
  const [error, setError] = useState(null);
  const [digimonDetails, setDigimonDetails] = useState({});

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await Promise.all(
          digimon.map(async (d) => {
            const data = await fetchDigimonDetails(d.id);
            return { id: d.id, attributes: data.attributes.map((a) => a.attribute) };
          })
        );
        const detailsMap = Object.fromEntries(details.map((d) => [d.id, d.attributes]));
        setDigimonDetails(detailsMap);
      } catch (err) {
        console.error(err);
      }
    };
    if (digimon.length > 0) {
      fetchDetails();
    }
  }, [digimon]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
    }
  };

  if (error) {
    return <div>錯誤：{error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-l-digimon p-4">
      <header className="relative flex items-center py-4 px-6">
        <Link to="/" className="z-10">
          <FaHome className="w-8 h-8 cursor-pointer" />
        </Link>
        <h1 className="flex absolute inset-0 text-4xl text-center items-center justify-center">
          Digimon
        </h1>
      </header>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-12">
        {digimon.map((d) => {
          const primaryAttribute = digimonDetails[d.id]?.[0] || "None";
          const backgroundColor = attributeColors[primaryAttribute] || "#fff";
          return (
            <li
              key={d.id}
              className="bg-white bg-opacity-50 shadow-md flex flex-col p-4 mb-4 rounded-xl"
            >
              <p className="text-gray-400 text-right">#{d.id}</p>
              <div
                style={{
                  aspectRatio: "1 / 1",
                  backgroundColor,
                }}
                className="p-2 rounded-full  overflow-hidden flex items-center justify-center"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-gray-600 text-center mt-2 capitalize">{d.name}</h1>
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
export default DigimonList;
