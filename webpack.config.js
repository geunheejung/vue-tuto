const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      // .vue 확장자 파일을 자바스크립트모듈로 변환하는 패키지.
      { test: /\.vue$/, use: "vue-loader" },
      // .vue 파일 안의 CSS 속성들을 파일로 가져와 html 파일에 넣어줌.
      { test: /\.css$/, use: ["vue-style-loader", "css-loader"] },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  resolve: {
    // 웹팩이 모듈을 어떻게 처리할지 정의한다.
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".tsx", ".js", ".vue"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new VueLoaderPlugin(),
  ],
};
