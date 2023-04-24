/*
 * @author: SumO
 * @create: 2022-12-20 15:04 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-25 16:17 PM
 * @desc: 课程管理接口
 */
import request from '@/utils/request'

// 获取课程列表
export const getQueryCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 控制课程 上下架
export const changeState = (data: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
  })
}
// 新建/编辑 课程
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}
// 上传图片
export const allocateUserRoles = (data: any, onUploadProgress: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    // html5 新增的上传响应事件
    // e.loaded 已上传的数据大小
    // e.total 上传文件的总大小
    onUploadProgress
  })
}
// 获取课程信息
export const getCourseById = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
// 获取课时
export const getLessons = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
// 更新阶段排序
export const saveOrUpdateSection = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}
// 更新课时排序
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
