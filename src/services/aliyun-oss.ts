/*
 * @author: SumO
 * @create: 2023-01-13 16:34 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 18:31 PM
 * @desc: 阿里云上传
 */
import request from '@/utils/request'
// 上传凭证
export const aliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

export const aliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}
// 转码请求
export const transCodeVideo = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}
// 转码进度
export const getAliyunTransCodePercent = (lessonId: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
