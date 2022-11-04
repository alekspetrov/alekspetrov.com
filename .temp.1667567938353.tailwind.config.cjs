/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        dark: {
          bg: "#121113"
          outline: "#29282A",
          card: "#1A181B",
        },
      },
      lineHeight: {
        base: "1.625rem",
      },
    },
  },
  plugins: [],
};
