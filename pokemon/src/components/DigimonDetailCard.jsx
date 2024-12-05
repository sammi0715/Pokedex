import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { fetchDigimonDetails } from "../utils/api";
import { attributeColors } from "../utils/color-scheme";
import Loading from "./Loading";

function DigimonDetailCard({ isOpen, onClose, digimonId }) {
  const [activeTab, setActiveTab] = useState("about");
  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const primaryAttribute = digimon?.attributes?.[0]?.attribute || "None";

  const backgroundColor = attributeColors[primaryAttribute] || "#fff";
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchDigimonDetails(digimonId);
        setDigimon(data);
      } catch (err) {
        setError("Failed to fetch Digimon details.");
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && digimonId) {
      fetchDetails();
    } else {
      setDigimon(null);
    }
  }, [isOpen, digimonId]);

  if (!isOpen || !digimon) return null;
  if (loading) {
    return <Loading type="indicator" message="Catching..." />;
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div
        style={{ backgroundColor }}
        className="bg-white rounded-2xl shadow-xl relative w-[85%] h-[80%] md:w-[600px] md:h-[650px] flex flex-col items-center"
      >
        <FaArrowLeft className="absolute left-2 top-4 w-6 h-6" onClick={onClose} />
        <h2 className="text-3xl capitalize text-center mt-8">{digimon.name}</h2>
        <span className="text-3xl text-right text-white text-opacity-50 absolute top-5 right-5">
          #{digimon.id}
        </span>
        <div className="flex justify-center mt-4 space-x-2 relative">
          <span className="px-2 py-1 mb-2 bg-white bg-opacity-30 text-white text-sm rounded-full tracking-wide">
            {digimon.types?.[0]?.type || "Unknown"}
          </span>
        </div>
        <p className="text-black"></p>
        <div className="w-56 h-56 lg:w-60 lg:h-60 z-20 ">
          <img
            src={digimon.images?.[0]?.href}
            alt={digimon.name}
            className="w-56 h-56 lg:w-60 lg:h-60 mx-auto rounded-xl"
          />
        </div>

        <div className="mt-4 p-4 lg:p-8 w-full h-full  text-center bg-white shadow-2xl rounded-2xl z-10 overflow-y-auto">
          <div className="flex justify-around border-b">
            <button
              className={`py-2 px-4 ${
                activeTab === "about"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "skills"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              Skills
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "evolution"
                  ? "text-black border-b-4 border-[#FFD950]"
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("evolution")}
            >
              Evolution
            </button>
          </div>
          {/* About section */}
          {activeTab === "about" && (
            <div className="overflow-x-auto p-2 tracking-wide">
              <table className="table-auto w-full text-left ">
                <tbody>
                  <tr>
                    <th className="px-4 py-2 text-gray-600 font-medium w-1/4">Type</th>
                    <td className="px-4 py-2 text-gray-800">
                      {digimon.types?.map((t) => t.type).join(", ") || "Unknown"}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 text-gray-600 font-medium">Level</th>
                    <td className="px-4 py-2 text-gray-800">
                      {`${digimon.levels?.[0]?.id || "Unknown"}, ${
                        digimon.levels?.[0]?.level || "Unknown"
                      }`}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 text-gray-600 font-medium">Attribute</th>
                    <td className="px-4 py-2 text-gray-800">
                      {digimon.attributes?.map((a) => a.attribute).join(", ") || "Unknown"}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 text-gray-600 font-medium">Release Date</th>
                    <td className="px-4 py-2 text-gray-800">{digimon.releaseDate || "Unknown"}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 text-gray-600 font-medium">Fields</th>
                    <td className="px-4 py-2 text-gray-800">
                      {digimon.fields?.map((f) => f.field).join(", ") || "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Skills section */}
          {activeTab === "skills" && (
            <div className="space-y-2 text-left tracking-wide p-2">
              {digimon.skills?.length > 0 ? (
                digimon.skills.map((skill) => (
                  <div key={skill.id} className="mb-2 p-2 border-b-2">
                    <p>
                      <span className="font-bold">Skill:</span> {skill.skill}
                    </p>
                    <p>
                      <span className="font-bold">Description:</span> {skill.description}
                    </p>
                  </div>
                ))
              ) : (
                <p>No skills available.</p>
              )}
            </div>
          )}

          {/* Evolution section */}
          {activeTab === "evolution" && (
            <div className="p-4">
              <h3 className="font-bold mb-2">Next Evolutions</h3>
              {digimon.nextEvolutions && digimon.nextEvolutions.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {digimon.nextEvolutions.slice(0, 2).map((evo) => (
                    <div
                      key={evo.id}
                      className="m-2 text-center flex flex-col items-center justify-center space-y-2"
                    >
                      <img
                        src={evo.image}
                        alt={evo.digimon}
                        className="w-16 h-16 rounded-full border-2 border-gray-300"
                      />
                      <p className="text-center text-sm font-medium">{evo.digimon}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No evolutions available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DigimonDetailCard;
