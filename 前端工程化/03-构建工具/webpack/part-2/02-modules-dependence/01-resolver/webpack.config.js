const path = require('path')
module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.json', '.js', '.vue']
  }
}