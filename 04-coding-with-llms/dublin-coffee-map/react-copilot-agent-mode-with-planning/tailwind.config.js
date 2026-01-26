/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#4a3b32",
        latte: "#d4a373",
        roast: "#bc6c25",
        cream: "#faf9f6",
        ink: "#2c241e",
      },
      fontFamily: {
        display: ["Lora", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
