module.exports = function (api) {
  api.cache(true)

  const presets = [
    "@babel/preset-env"
  ]

  return {
    presets,
    plugins: [
      "@babel/plugin-transform-runtime"
    ]
  }
}
