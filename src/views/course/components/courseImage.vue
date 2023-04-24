<!--
 * @author: SumO
 * @create: 2022-12-21 18:32 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-21 19:14 PM
 * @desc: 上传组件封装
-->
<template>
  <div>
    <el-progress v-if="isUploading" :status="percentage === 100 ? 'success' : undefined" type="circle" :width="178"
      :percentage="percentage"></el-progress>
    <el-upload v-if="!isUploading" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
      :http-request="handleUpload" :show-file-list="false" :before-upload="beforeAvatarUpload">
      <img v-if="value" :src="value" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip">
        <el-tag slot="tip" type="info">建议尺寸: 230*300px, JPG、PNG格式, 图片小于150K</el-tag>
      </div>
    </el-upload>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { allocateUserRoles, saveOrUpdateCourse } from '@/services/course'
export default vue.extend({
  name: 'courseImage',
  components: {},
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      percentage: 0,
      isUploading: false
    }
  },
  methods: {
    beforeAvatarUpload(file: any) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async handleUpload(options: any) {
      this.isUploading = true
      const fd = new FormData()
      fd.append('file', options.file)
      const { data } = await allocateUserRoles(fd, (e: any) => {
        this.percentage = Math.floor(e.loaded / e.total * 100)
      })
      this.isUploading = false
      this.percentage = 0
      this.$emit('input', data.data.name)
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
