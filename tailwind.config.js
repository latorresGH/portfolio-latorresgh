/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './src/**/*.{astro,html,js,jsx,ts,tsx}', // para escanear todos los archivos
    ],
    theme: {
      extend: {
        fontFamily: {
          suisse: ['SuisseIntl', 'sans-serif'],
          aurora: ['Aurora', 'sans-serif'],
          Zaslia: ['Zaslia', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
          overcame: ['OvercameDemo', 'sans-serif'], 
          caslon: ['"Libre Caslon Text"', 'serif'],
        },
      },
    },
    plugins: [],
  };
  