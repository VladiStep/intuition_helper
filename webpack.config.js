const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
          plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-transform-typescript"],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components)/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { url: true } },
          {
            loader: "sass-loader",
            options: {
              additionalData: `@import "./src/scss/_variables.scss";`,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif|ttf|wav|txt)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    port: 9000,
    hot: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html",
      title: "Помощник интуиции",
      templateParameters: { buildTime: Date.now() },
      inject: false,
      hot: true,
    })
  ],
};
