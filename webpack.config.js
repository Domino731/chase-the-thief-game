const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
  mode: mode,
  stats: {
    children: false,
  },
  entry: {
    index: `./src/index.js`
  },
  plugins: [new MiniCssExtractPlugin()],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // file loader for images
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      // sass compiler
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  target: target,
  resolve: {
    extensions: [".js"],
  },
 // devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname),
    publicPath: "/dist/",
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
};
