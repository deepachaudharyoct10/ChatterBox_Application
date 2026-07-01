/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes: [
      {
        chatterbox: {
          "primary": "#4A6FA5",
          "secondary": "#6B8CAE",
          "accent": "#5C7A99",
          "neutral": "#2D3748",
          "base-100": "#F4F6F8",
          "base-200": "#E3E8EC",
          "base-300": "#CBD5E0",
          "info": "#5C8DBC",
          "success": "#6FBF9A",
          "warning": "#E0A94F",
          "error": "#C86B6B",
        },
      },
    ],
  },
};
