/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // para escanear todos los archivos
  ],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      fontFamily: {
        suisse: ["SuisseIntl", "sans-serif"],
        aurora: ["Aurora", "sans-serif"],
        Zaslia: ["Zaslia", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        overcame: ["OvercameDemo", "sans-serif"],
        caslon: ['"Libre Caslon Text"', "serif"],
        FuturaBook: ["FuturaBook", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        bebasNeue: ['"Bebas Neue"', "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      lineHeight: {
        custom: "1.8125rem", // para 29px
      },
      backgroundSize: {
        50: "50%",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
};
