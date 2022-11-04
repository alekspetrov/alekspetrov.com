/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        light: {
          title: "#121113",
          text: "#8f9292",
          bg: "#f5f4f5",
          outline: "#e8e8e9",
          card: "#ffffff",
        },
        dark: {
          title: "#e7e8e8",
          text: "#8f9292",
          bg: "#121113",
          outline: "#29282a",
          card: "#1a181b",
        },
      },
      lineHeight: {
        base: "1.625rem",
      },
    },
  },
  plugins: [],
};
