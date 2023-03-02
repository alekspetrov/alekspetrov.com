/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "Open Sauce Sans", "system-ui", "sans-serif"],
      },
    },
    colors: {
      black: "#090809",
      white: "#ffffff",
      gray: {
        900: "#1D1F20",
        800: "#353739",
        700: "#5F6061",
        600: "#7B7B7B",
        500: "#9D9D9D",
        400: "#B5B5B5",
        300: "#D5D5D5",
        200: "#E5E6E8",
        100: "#F4F5F5",
      },
      social: {
        twitter: "#1DA1F2",
        linkedin: "#0A66C2",
      },
    },
    backgroundImage: {
      highlight: "url('/images/bg_highlights.png'), #1d1f20",
    },
    fontSize: {
      huge: [
        "5.5rem",
        {
          lineHeight: "1em",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
      large: [
        "4rem",
        {
          lineHeight: "1.1em",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
      medium: [
        "2rem",
        {
          lineHeight: "1.1em",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
      title: [
        "1.5rem",
        {
          lineHeight: "1.5em",
          letterSpacing: "-0.01em",
          fontWeight: "700",
        },
      ],
      body: [
        "1.125rem",
        {
          lineHeight: "1.5em",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
      small: [
        "1rem",
        {
          lineHeight: "1.5em",
          letterSpacing: "0",
          fontWeight: "400",
        },
      ],
    },
  },
  plugins: [],
};
