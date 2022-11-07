/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        default: "480px",
        callout: "496"
        wide: "1080px",
      },
      screens: {
        sm: "480px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },

      colors: {
        light: {
          title: "#121113",
          text: "#67626A",
          bg: "#fafafa",
          outline: "#e8e8e9",
          card: "#ffffff",
        },
        dark: {
          title: "#e7e8e8",
          text: "#8f9292",
          bg: "#1a181b",
          outline: "#29282a",
          card: "#1f1d20",
        },
      },
      lineHeight: {
        base: "1.625rem",
      },
    },
  },
  plugins: [],
};
