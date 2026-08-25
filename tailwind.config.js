/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-dark": "#323232",
        "main-orange": "#56c8e8",
      },
      transitionProperty: {
        width: "width",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#646464",
            "h1, h2, h3, h4, h5, h6": {
              margin: 0,
              color: "#323232",
            },
            p: {
              fontSize: "1.5rem",
              lineHeight: 1.5,
            },
            strong: {
              color: "#323232",
            },
            blockquote: {
              color: "#646464",
              lineHeight: 1.4,
              borderLeft: "0.5rem solid #56c8e8",
              background: "rgba(86,200,232,.08)",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
            "blockquote > p": {
              fontSize: "1.4rem",
              padding: "1.2rem 1.6rem 1.2rem 0",
            },
            "ul li": {
              fontSize: "1.3rem",
              color: "#646464",
              marginBottom: "0.2rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#56c8e8",
        },
      },
    ],
  },
}
