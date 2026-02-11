/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5454D4",
          50: "#F0F0FD",
          100: "#DCDCFA",
          200: "#B8B8F5",
          300: "#9595F0",
          400: "#7474EB",
          500: "#5454D4",
          600: "#3636B8",
          700: "#2A2A8A",
          800: "#1D1D5C",
          900: "#11112E",
        },
        dark: "#1C1C28",
        body: "#637381",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      fontSize: {
        hero: ["3.5rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      borderRadius: {
        blob: "30% 70% 70% 30% / 30% 30% 70% 70%",
      },
    },
  },
  plugins: [],
};
