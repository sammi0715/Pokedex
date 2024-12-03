import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    if (currentPage > 4) {
      pageNumbers.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 2);
      i <= Math.min(totalPages - 1, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 3) {
      pageNumbers.push("...");
    }

    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <FaArrowLeft
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className={`flex items-center justify-center w-6 h-6 rounded-full ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-500 hover:text-black cursor-pointer"
        }`}
      />

      {pageNumbers.map((number, index) =>
        typeof number === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(number)}
            className={`flex items-center justify-center w-6 h-6 rounded-full ${
              currentPage === number ? "bg-black text-white" : "text-gray-600 hover:bg-white"
            }`}
          >
            {number}
          </button>
        ) : (
          <span key={index} className="flex items-center justify-center w-6 h-6 text-gray-400">
            ...
          </span>
        )
      )}

      <FaArrowRight
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-6 h-6 rounded-full ${
          currentPage === totalPages
            ? "text-gray-400"
            : "text-gray-500 hover:text-black cursor-pointer"
        }`}
      />
    </div>
  );
}

export default Pagination;
