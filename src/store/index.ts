/*
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-20 17:19 PM
 * @desc:
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储user信息及状态 （JSON.parse('null') 为数据类型 null）
    user: JSON.parse(localStorage.getItem('user') || 'null'), // 当前登录用户状态
    threeLevelRoute: true
  },
  mutations: {
    // 修改数据鼻血使用 mutations 函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)
      // 持久化数据
      localStorage.setItem('user', payload)
    },
    // 判断是否是三级路由(因为三级路由与二级路由互斥)
    setThreeLevelRoute(state, payload) {
      state.threeLevelRoute = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
