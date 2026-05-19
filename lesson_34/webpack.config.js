const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: "./src/assets/scripts/main.js",
  },

  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },

  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [new HTMLWebpackPlugin({ template: "./src/index.html" })],
};
