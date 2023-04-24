/*
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-05 15:58 PM
 * @desc:
 */
import Vue, { VNode } from 'vue'
// 补充类型说明，适配jsx
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
