import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#d6e9ff",
          200: "#add3ff",
          300: "#7ab8ff",
          400: "#509eff",
          500: "#297df5",
          600: "#1c60d2",
          700: "#154aa6",
          800: "#103b7f",
          900: "#0a264f"
        },
        neutral: {
          900: "#121416"
        }
      }
    }
  },
  plugins: []
};

export default config;
