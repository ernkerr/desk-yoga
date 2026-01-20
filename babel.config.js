module.exports = function (api) {
  api.cache(true);
  api.cache(true);
  return {
    presets: [["babel-preset-expo", {
      jsxImportSource: "nativewind"
    }], "nativewind/babel"],
    plugins: ["react-native-reanimated/plugin", ["module-resolver", {
      root: ["./"],

      alias: {
        "@": "./",
        "@config": "./src/config",
        "@core": "./src/core",
        "@games": "./src/games",
        "@components": "./src/components",
        "@ui": "./src/components/ui",
        "tailwind.config": "./tailwind.config.js"
      }
    }]],
  };
};
