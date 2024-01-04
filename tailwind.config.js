/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorsTheme: {
          primary: "#154E64",
          secondary: "#323848",
          accent: "#02CDBC",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

