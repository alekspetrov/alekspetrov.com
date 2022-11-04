/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        light: "#121113",
        dark: "#121113",
        card: {
          light: "#121113",
          dark: "#121113",
        },
      },
      lineHeight: {
        base: "1.625rem",
      },
    },
  },
  plugins: [],
};
