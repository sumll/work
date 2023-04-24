/*
 * @author: SumO
 * @create: 2022-12-09 14:45 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 19:48 PM
 * @desc: 用户接口
 */
import request from '@/utils/request'
import qs from 'qs'
interface User {
  phone: string
  password: string
}
// 登录
export const loginInfo = (form: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: {
    //   contentType: 'application/x-www-form-urlencoded'
    // },
    data: qs.stringify(form)
  })
}
// 获取用户个人信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
// 用户退出登录
export const logout = () => {
  return request({
    method: 'POST',
    url: '/front/user/logout'
  })
}
// 获取所有用户
export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
// 封禁用户
export const forbidUser = (userId: number) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    data: {
      userId
    }
  })
}
// 用户权限菜单
export const getUserPermissions = () => {
  return request({
    method: 'GET',
    url: '/boss/permission/getUserPermissions'
  })
}
