import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
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
} satisfies Config;
