import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        panel: "#15151c",
        border: "#2b2d42",
        muted: "#8d99ae",
        anime: "#ef233c"
      },
      boxShadow: {
        glow: "0 0 40px rgba(239, 35, 60, 0.28)",
        soft: "0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      backgroundImage: {
        "hero-noise": "radial-gradient(circle at 20% 10%, rgba(239,35,60,.22), transparent 30%), radial-gradient(circle at 82% 22%, rgba(112,81,255,.15), transparent 26%), linear-gradient(180deg, rgba(11,11,15,.2), #0b0b0f 86%)"
      }
    }
  },
  plugins: []
};

export default config;
