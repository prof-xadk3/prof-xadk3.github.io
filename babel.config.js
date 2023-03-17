module.exports = function(api) {

  console.log(api); // aka. class/obj / dist.

  api.cache(true);

  const presets = ['@babel/preset-typescript'];
  const plugins = ['react-native-reanimated/plugin', {
    relativeSourceLocation: true,
  }];

  if (process.env["ENV"] === "prod") {
    // plugins.push(...);
    console.log("Are you sure? :| Ok.")
  }

  return {
    presets,
    plugins
  };
}
