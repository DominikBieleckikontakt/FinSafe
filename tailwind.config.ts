import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2FF736",
        "primary-darker": "#2ff736cc",
        secondary: "#2FEDF7",
        background: "#0d0d0d",
        "background-lighter": "#1a1a1a",
      },
      animation: {
        "spin-slow": "spin 120s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
