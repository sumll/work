/*
 * @author: SumO
 * @create: 2022-12-14 17:51 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-17 17:40 PM
 * @desc: 资源管理接口
 */
import request from '@/utils/request'

export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
// 获取资源类型
export const getCategoryId = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
// 保存或更新资源
export const saveOrUpdateResource = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
// 删除资源
export const deleteResource = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}
// 添加或编辑资源分类
export const categorySaveOrderUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}
// 删除资源分类
export const deleteCategory = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
// 获取所有资源
export const getResourceAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}
// 给角色分配资源
export const allocateRoleResources = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
// 获取角色拥有的资源列表
export const getRoleResources = (roleId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}
