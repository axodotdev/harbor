const tailwindConfigs = require("@axodotdev/fringe/tailwind.config");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  ...tailwindConfigs,
  theme: {
    ...tailwindConfigs.theme,
    colors: {
      ...tailwindConfigs.theme.colors,
      green: defaultColors.green,
      red: defaultColors.red,
    },
    maxWidth: {
      ...tailwindConfigs.theme.maxWidth,
      "prose-lg": "80ch",
    },
  },

  content: [
    ...tailwindConfigs.content,
    "./node_modules/@axodotdev/fringe/lib/*.vue",
    "nuxt.config.js",
  ],
};
