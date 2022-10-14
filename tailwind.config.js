const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

const extractColorVars = (themeColors, colorGroup = "") =>
  Object.keys(themeColors).reduce((currentVars, colorKey) => {
    const value = themeColors[colorKey];
    const newVars =
      typeof value === "string"
        ? { [`--color${colorGroup}-${colorKey}`]: value }
        : extractColorVars(value, `-${colorKey}`);

    return { ...currentVars, ...newVars };
  }, {});

const tailwindColorsToCSSVariables = ({ addBase, theme }) =>
  addBase({
    ":root": extractColorVars(theme("colors")),
  });

const colors = {
  "axo-pink": "hsla(326, 100%, 73%, 1)",
  "axo-pink-dark": "hsla(326, 52%, 58%, 1)",
  "axo-orange": "hsla(0, 87%, 70%, 1)",
  "axo-orange-dark": "hsla(356, 75%, 64%, 1)",
  slate: defaultColors.slate,
  violet: defaultColors.violet,
  transparent: defaultColors.transparent,
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./components/**/*.vue", "./pages/**/*.vue", "./nuxt.config.js"],
  theme: {
    colors,
    extend: { sans: ["Comfortaa", ...defaultTheme.fontFamily.sans] },
  },
  plugins: [tailwindColorsToCSSVariables],
};
