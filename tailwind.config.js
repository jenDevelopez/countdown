/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2430",
        "ink-soft": "#4a5568",
        blush: "#f0b8c4",
        rose: "#c76b84",
        petal: "#e88a9a",
        mist: "#d4e0ef",
        sky: "#8aa4c4",
        dusk: "#5a7394",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Outfit"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
