/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-l-pokemon': 'linear-gradient(270deg, #D3EEF4ff, #D8EEEDff, #DDEEE5ff, #E2EEDEff, #E7EED7ff, #ECEECFff, #F1EEC8ff)',
        'gradient-to-l-home': 'linear-gradient(135deg, hsla(197, 85%, 79%, 1) 0%, hsla(55, 44%, 95%, 1) 52%, hsla(27, 95%, 84%, 1) 100%)',
        'gradient-to-l-digimon': 'linear-gradient(90deg, #F0EAFCff, #D8E5FAff, #C0E1F9ff, #A9DCF7ff, #91D7F5ff, #79D3F4ff, #61CEF2ff)',
        'back': "url('/src/assets/pokemon.png')",
        'gradient': "url('/src/assets/pokemon-gradient-flash.png')",
      },
      animation: {
        "spin": "spin 0.6s linear infinite",
        marquee: "marquee 15s linear infinite",
        "marquee-reverse": "marquee-reverse 15s linear infinite",
      },
      keyframes: {

        'marquee': {
          from: {
            transform: "translateX(0%)",
          },
          to: {
            transform: "translateX(-100%)",
          },
        },
        'marquee-reverse': {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0%)",
          },
        },
      },
    },
  },
  plugins: [],
};
