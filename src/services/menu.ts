/*
 * @author: SumO
 * @create: 2022-12-09 14:45 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-17 15:57 PM
 * @desc: 菜单接口
 */
import request from '@/utils/request'

export const createOrUpdateMenu = (data?: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}
// 获取或编辑父级菜单
export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
// 获取所有菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}
// 删除菜单
export const deleteMenu = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
// 获取所有菜单并按层级展示
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}
// 获取角色拥有的菜单
export const getRoleMenus = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
// 给角色分配菜单
export const allocateRoleMenus = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}
