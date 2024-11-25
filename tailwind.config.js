module.exports = {
  content: ["./**/*.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "shady-pink": "rgb(209, 136, 124)",
      },
      spacing: {
        112: "38rem",
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
