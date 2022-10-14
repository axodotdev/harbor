const tailwindConfigs = require("@axodotdev/fringe/tailwind.config");
module.exports = {
  ...tailwindConfigs,
  content: [
    ...tailwindConfigs.content,
    "nuxt.config.js",
    "node_modules/@axodotdev/fringe/lib/**/*.vue",
  ],
};
