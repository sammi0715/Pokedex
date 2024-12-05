import React from "react";
import { FaExclamationTriangle, FaNetworkWired } from "react-icons/fa";
import { PiBugBold } from "react-icons/pi";

const ErrorMessage = ({ message, onRetry, type }) => {
  const getIcon = () => {
    switch (type) {
      case "network":
        return <FaNetworkWired className="text-4xl mb-4 animate-pulse" />;
      case "server":
        return <FaExclamationTriangle className="text-4xl mb-4 animate-pulse" />;
      case "unknown":
      default:
        return <PiBugBold className="text-8xl mb-4 animate-pulse" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center text-red-500 p-4 transition-opacity duration-500 opacity-100">
      {getIcon()}
      <p className="mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition flex items-center"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
