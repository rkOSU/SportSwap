/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f4f7ec",
          100: "#e3eccf",
          200: "#c9dca3",
          300: "#aeca74",
          500: "#84a83a",
          600: "#657f2e",
          700: "#4d6126",
          900: "#1d2a13"
        },
        lake: {
          50: "#eef7f7",
          100: "#d3e8e9",
          500: "#427f85",
          600: "#2e6268",
          700: "#244d53"
        },
        trail: {
          50: "#fbf3e7",
          100: "#f3dfbf",
          500: "#b87534",
          700: "#7a451f"
        },
        basalt: {
          900: "#080a07",
          800: "#10140f",
          700: "#171d15",
          600: "#222a1e"
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
