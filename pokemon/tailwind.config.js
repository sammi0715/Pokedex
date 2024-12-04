/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-l-pokemon': 'linear-gradient(270deg, #D3EEF4ff, #D8EEEDff, #DDEEE5ff, #E2EEDEff, #E7EED7ff, #ECEECFff, #F1EEC8ff)',
        'gradient-to-l-home': 'linear-gradient(270deg, #B597F6ff, #B09FF4ff, #ABA7F2ff, #A6AFF0ff, #A0B6EEff, #9BBEECff, #96C6EAff)',
        'gradient-to-l-digimon': 'linear-gradient(90deg, #F0EAFCff, #D8E5FAff, #C0E1F9ff, #A9DCF7ff, #91D7F5ff, #79D3F4ff, #61CEF2ff)',
      },
      animation: {
        "spin-color-change": "spin 1s linear infinite, color-change 1s ease-in-out infinite",
      },

      keyframes: {
        'color-change': {
          "0%, 100%": { color: "#F34F44" },
          "50%": { color: "#368AFF" },
        },
      },
    },
  },
  plugins: [],
}

