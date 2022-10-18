const tailwindConfigs = require("@axodotdev/fringe/tailwind.config");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  ...tailwindConfigs,
  theme: {
    ...tailwindConfigs.theme,
    colors: {
      ...tailwindConfigs.theme.colors,
      success: {
        300: defaultColors.green[300],
        600: defaultColors.green[600],
        700: defaultColors.green[700],
      },
      error: {
        600: defaultColors.red[600],
        700: defaultColors.red[700],
      },
    },
  },
  content: [...tailwindConfigs.content, "nuxt.config.js"],
};
