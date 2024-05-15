import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: "#146F68",
        dark: "#141518",
      },
      fontFamily: {
        ...defaultTheme.fontFamily,
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // TODO: check that this is only required for development
    // The package exports the compiled style sheet
    "../../packages/identity-kit/src/libs/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
