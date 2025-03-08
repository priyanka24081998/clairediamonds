/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        
      },
      keyframes: {
        "move-down": {
          "0%": { transform: "translateY(-50%)", borderRadius: "50%" },
          "100%": { transform: "translateY(50%)", borderRadius: "50%" },
        },
      },
      animation: {
        "move-down": "move-down 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

