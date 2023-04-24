/*
 * @author: SumO
 * @create: 2022-12-16 15:46 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-18 18:03 PM
 * @desc: 角色管理
 */
import request from '@/utils/request'

// 获取角色列表
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
// 新增或编辑 角色
export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}
// 删除角色
export const deleteRole = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
// 获取所有角色
export const getRoleAll = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}
// 给用户分配角色
export const allocateUserRoles = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
// 查看用户已有角色
export const getRoleIdAll = (userId: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
