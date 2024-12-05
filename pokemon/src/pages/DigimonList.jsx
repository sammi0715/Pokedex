import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import digiLogo from "../assets/digi-logo.png";
import DigimonDetailCard from "../components/DigimonDetailCard";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
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
  const [selectedDigimonId, setSelectedDigimonId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDigimonList(currentPage, ITEMS_PER_PAGE);
      setDigimon(data.content);
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
        console.error("Failed to fetch Digimon details:", err);
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
  const handleDigimonClick = (id) => {
    if (digimonDetails[id]) {
      setSelectedDigimonId(id);
      setIsModalOpen(true);
    } else {
      alert("Failed to load Digimon details. Please try again later.");
    }
  };

  const closeModal = () => {
    setSelectedDigimonId(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-l-digimon p-4">
      <header className="relative flex items-center justify-center py-4 px-6">
        <div className="w-12 h-12 md:w-14 md:h-14 bg-white bg-opacity-50 absolute left-6  items-center flex justify-center rounded-full">
          <Link to="/" className="">
            <FaHome className="w-8 h-8 md:w-10 md:h-10  text-orange-400 hover:text-orange-600 cursor-pointer" />
          </Link>
        </div>
        <img src={digiLogo} className="w-[150px] md:w-[300px]" alt="Digimon Logo" />
      </header>
      {error ? (
        <ErrorMessage message={`Error：${error.message}`} onRetry={fetchData} type={error.type} />
      ) : loading ? (
        <Loading type="list" message="Gotta catch 'em all..." itemsPerPage={ITEMS_PER_PAGE} />
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-12">
          {digimon.map((d) => {
            const primaryAttribute = digimonDetails[d.id]?.[0] || "None";
            const backgroundColor = attributeColors[primaryAttribute] || "#fff";
            return (
              <li
                key={d.id}
                className="bg-white bg-opacity-50 shadow-md flex flex-col p-4 mb-4 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => handleDigimonClick(d.id)}
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
                <h1 className="text-gray-600 text-center mt-2 capitalize break-words">{d.name}</h1>
              </li>
            );
          })}
        </ul>
      )}
      <DigimonDetailCard isOpen={isModalOpen} onClose={closeModal} digimonId={selectedDigimonId} />
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
export default DigimonList;
