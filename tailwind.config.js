module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "shady-pink-dark": "rgb(209, 136, 124)",
        "shady-pink": "rgb(211, 173, 154)",
        "shady-pink-light": "rgb(234, 210, 200)",
        "shady-pink-lightest": "rgb(251, 243, 241)",
      },
      spacing: {
        112: "28rem",
        144: "36rem",
        192: "48rem",
      },
    },
    fontFamily: {
      serif: [
        "Forum",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      sans: [
        "Open Sans",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      // TODO: is this really needed?
      sans2: [
        "Montserrat",
        "Open Sans",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
      fancy: ["Dancing Script", "serif"],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
