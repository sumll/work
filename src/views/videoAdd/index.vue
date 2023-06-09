<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <div>课程：{{ courseName }}</div>
        <div>阶段：{{ sectionName }}</div>
        <div>课时：{{ theme }}</div>
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input ref="video-file" type="file">
        </el-form-item>
        <el-form-item label="封面">
          <input ref="image-file" type="file" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isUpload" @click="authUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p v-if="isUpload">视频上传中:{{ uploadPercent }}%</p>
          <p v-if="isUploadSuccess">视频转码中:{{ isTransCodeSuccess ? '完成' : '正在处理请稍后...' }}</p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script lang='ts'>
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  transCodeVideo,
  getAliyunTransCodePercent
} from '@/services/aliyun-oss'
import { getLessons, getCourseById } from '@/services/course'
import vue from 'vue'
export default vue.extend({
  data() {
    return {
      uploader: null,
      videoId: null,
      imageUrl: '',
      fileName: '',
      isUpload: false,
      uploadPercent: 0,
      isUploadSuccess: false,
      isTransCodeSuccess: false,
      courseName: '',
      sectionName: '',
      theme: ''
    }
  },
  computed: {
    video() {
      return this.$refs['video-file']
    },
    image() {
      return this.$refs['image-file']
    }
  },
  created() {
    this.initUploader()
    this.getCourseName()
    this.getCourseStage()
  },

  methods: {
    authUpload() {
      this.isUpload = true
      this.uploadPercent = 0
      this.isUploadSuccess = false
      this.isTransCodeSuccess = false
      // const videoFile = this.$refs['video-file'].files[0]
      // this.uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      // this.uploader.addFile(this.$refs['image-file'].files[0], null, null, null, '{"Vod":{}}')
      // this.uploader.startUpload()
      const videoFile = (this.video as any).files[0]
      const imageFile = (this.image as any).files[0]
      const uploader = this.uploader as any
      this.fileName = videoFile.name
      // 将用户所选的文件添加到上传列表中
      uploader.addFile(videoFile, null, null, null, '{"Vod":{}}')
      uploader.addFile(imageFile, null, null, null, '{"Vod":{}}')
      // 开始上传，触发onUploadstarted
      uploader.startUpload()
      console.log(videoFile, imageFile)
    },
    initUploader() {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: '1618139964448548',
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async(uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)
          let uploadAuthInfo = null
          // 1.判断是上传图片或视频(获取上传凭证)
          if (uploadInfo.isImage) {
            const { data } = await aliyunImagUploadAddressAdnAuth()
            this.imageUrl = data.data.imageURL
            uploadAuthInfo = data.data
          } else {
            const { data } = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            this.videoId = data.data.videoId
            uploadAuthInfo = data.data
          }

          // console.log('uploadAuthInfo', uploadAuthInfo)
          // 2.设置上传凭证
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAuthInfo.uploadAuth,
            uploadAuthInfo.uploadAddress,
            uploadAuthInfo.videoId || uploadAuthInfo.imageId
          )
        },
        // 文件上传成功
        onUploadSucceed: (uploadInfo: any) => {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function(uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo, code)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          if (!uploadInfo.isImage) {
            this.uploadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: function(uploadInfo: any) {
          console.log('onUploadTokenExpired')
        },
        // 全部文件上传结束
        onUploadEnd: async(uploadInfo: any) => {
          this.isUploadSuccess = true
          console.log(uploadInfo)
          // 请求转码
          const { data } = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName
          })
          console.log(data)
          const timer = setInterval(async() => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId)
            if (data.data === 100) {
              window.clearInterval(timer)
              this.isUpload = false
              this.isTransCodeSuccess = true
              console.log('转码成功')
            }
          }, 3000)
        }
      })
    },
    // 查询课程名称
    async getCourseName() {
      const { data } = await getCourseById(this.$route.params.courseId as string)
      this.courseName = data.data.courseName
    },
    // 获取阶段
    async getCourseStage() {
      const { data } = await getLessons(this.$route.params.courseId as string)
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].lessonDTOS) {
          for (let j = 0; j < data.data[i].lessonDTOS.length; j++) {
            if (data.data[i].lessonDTOS[j].id === Number(this.$route.query.lessonId)) {
              this.sectionName = data.data[i].sectionName
              this.theme = data.data[i].lessonDTOS[j].theme
            }
          }
        }
      }
      console.log(data, '123')
    }
  }
})
</script>
