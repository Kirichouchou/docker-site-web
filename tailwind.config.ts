import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 25px -15px rgba(0,0,0,0.2)",
      },
      transitionProperty: {
        all: "all",
      },
    },
  },
  plugins: [],
};

export default config;

