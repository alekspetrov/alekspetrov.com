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
        default: "38rem",
        callout: "40rem",
        wide: "64rem",
      },
      screens: {
        sm: "576px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        light: {
          title: "#121113",
          text: {
            default: "#67626A",
            active: "#121113",
          },
          bg: "#fafafa",
          outline: "#e8e8e9",
          card: "#ffffff",
        },
        dark: {
          title: "#C7C9C9",
          text: {
            muted: "#8f9292",
            default: "#8f9292",
            active: "#C7C9C9",
          },
          bg: "#1a181b",
          outline: "#29282a",
          card: "#1f1d20",
        },
      },
      lineHeight: {
        base: "1.625rem",
      },
      backgroundImage: {
        "content-genius": "url('/images/content-genius-bg.png')",
      },
    },
  },
  plugins: [],
};
