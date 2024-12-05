import React from "react";
import LogoPattern from "../assets/logo-pattern.png";

function MarqueeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex items-center gap-8 ${
            rowIndex % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"
          } whitespace-nowrap h-[140px]`}
        >
          {[...Array(10)].map((_, index) => (
            <img
              key={index}
              src={LogoPattern}
              alt="Pokemon x Digimon"
              className="h-[120px] w-auto opacity-80"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
export default MarqueeBackground;
