/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#edf8f1",
          100: "#d6efe0",
          200: "#b7dfc8",
          300: "#88c5a7",
          500: "#2f8a5d",
          600: "#247049",
          700: "#1f5a3e",
          900: "#163828"
        },
        lake: {
          50: "#edf7fb",
          100: "#d5ebf4",
          500: "#247ca3",
          600: "#1e6382",
          700: "#1b526c"
        },
        trail: {
          50: "#f7f4ef",
          100: "#ebe3d5",
          500: "#a8793d",
          700: "#745226"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(31, 42, 37, 0.08)",
        card: "0 8px 24px rgba(28, 43, 38, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    },
  },
  plugins: [],
};
