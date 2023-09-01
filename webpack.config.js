const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      // .vue 확장자 파일을 자바스크립트모듈로 변환하는 패키지.
      { test: /\.vue$/, use: "vue-loader" },
      // .vue 파일 안의 CSS 속성들을 파일로 가져와 html 파일에 넣어줌.
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
