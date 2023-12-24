/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins"],
    },
    extend: {
      colors: {
        aliceblue: "aliceblue",
      },
      screens: {
        ss: "400px",
      },
      keyframes: {
        rotateOpacity: {
          "0%": { opacity: "0", transform: "rotate(45deg)" },
          "100%": { opacity: "1", transform: "rotate(0)" },
        },
        opacity: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        rotateOpacity: "rotateOpacity 0.3s ease-in-out 1",
        opacity: "opacity 0.2s ease-in-out 1",
      },
    },
  },
  plugins: [],
};
