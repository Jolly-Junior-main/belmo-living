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
        belmo: {
          // Official Logo Palette
          bronze: "#8A5623",         // Circle leather/bronze primary
          "bronze-light": "#B87F44", // Circle highlight
          "bronze-dark": "#5A3410",  // Circle deep shadow
          gold: "#E8C27B",           // Logo text champagne gold
          "gold-light": "#F5E0AB",   // Bright foil accent
          "gold-dark": "#C99F4E",    // Muted gold
          walnut: "#8A5623",         // Unified brand timber tone
          "walnut-dark": "#4A290A",
          charcoal: "#1A130D",       // Warm deep espresso charcoal
          "charcoal-muted": "#2C2016",
          white: "#FFFFFF",
          ivory: "#FAF7F2",          // Warm ivory
          beige: "#EDE5DA",          // Natural linen beige
          cream: "#F5EFE6",          // Soft cream
          surface: "#F0E9DF",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        editorial: "0.15em",
        wide: "0.08em",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s infinite linear",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
