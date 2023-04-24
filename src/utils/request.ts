/*
 * @author: SumO
 * @create: 2022-12-06 14:50 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-15 14:12 PM
 * @desc: 请求工具
 */

import axios, { AxiosRequestConfig } from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import NProgress from './loadNprogress'
import qs from 'qs'
function redirectLogin() {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken() {
  // 为了保证不进入401拦截器请求循环，创建新的请求实列
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
const request = axios.create({
  // 配置选项
  // baseUrl: "http://"
})

interface YXRequestConfig extends AxiosRequestConfig {
  headers?: any;
}

// 请求拦截器
request.interceptors.request.use((config: YXRequestConfig) => {
  NProgress.start()
  const { user } = store.state
  if (user && user.access_token) config.headers.Authorization = user.access_token

  return config
})
// 判断是否开启刷新token
let isRfeshing = false
// 存储所有401请求
let requests: any[] = []
// 响应拦截器
request.interceptors.response.use((config) => {
  NProgress.done()
  // 当状态码为2xx才会进(超出2xx都进err)
  // 如果是自定义状态码成功超出2xx等都是进入这里
  const { data } = config
  // 无权限
  if (data.code === '10000') {
    Message.error(data.mesg)
  }
  return config
}, async(err) => {
  NProgress.done()
  // 查看错误对象 ：console.dir(err)
  // 响应成功但状态码超出2xx
  if (err.response) {
    const { status } = err.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
      }
      // 尝试刷新token中
      if (!isRfeshing) {
        // 开启刷新token
        isRfeshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          store.commit('setUser', res.data.content)
          // 重新发起请求
          requests.forEach(item => item())
          // 重置requests数组
          requests = []
          // 第一次发的请求重发出去
          return request(err.config)
        }).catch(err => {
          // 清除当前用户登录状态
          store.commit('setUser', null)
          // 重新登陆
          redirectLogin()
          return Promise.reject(err)
        }).finally(() => {
          // 重置刷新状态
          isRfeshing = false
        })
      }
      // 挂起请求 并存储401请求
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(err.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限进行此操作')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请稍后重试')
    }
    // 没有响应
  } else if (err.request) {
    Message.error('请求超时，请稍后重试')
    // 请求发生时发生错误
  } else {
    Message.error(`请求失败，${err.message}`)
  }
  // 抛出继续错误对象
  return Promise.reject(err)
})

export default request
