/*
 * @author: SumO
 * @create: 2022-12-06 14:14 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 21:54 PM
 * @desc: cli 选型
 */
module.exports = {
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/boss": {
        target: "http://eduboss.lagounews.com",
        // 把请求头中的 host 配置为target
        changeOrigin: true,
      },
      "/front": {
        target: "http://edufront.lagounews.com",
        changeOrigin: true,
      },
    },
  },
};
