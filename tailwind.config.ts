import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { opacity: "0", transform: "translateY(50%)" },
          "100%": { opacity: "1", transform: "translateY(0%)" },
        },
      },
      colors: {
        primary: "#2FF736",
        "primary-darker": "#26c32b",
        secondary: "#2FEDF7",
        background: "#0d0d0d",
        "background-lighter": "#1a1a1a",
      },
      animation: {
        "spin-slow": "spin 120s linear infinite",
        appear: "appear .5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
