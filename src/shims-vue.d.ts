/*
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 16:22 PM
 * @desc:
 */
// 因为ts识别不了.vue模块
// 以下为.vue声明适配
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

interface Window {
  AliyunUpload: any
}
