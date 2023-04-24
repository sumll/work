<!--
 * @author: SumO
 * @create: 2022-12-26 15:23 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-26 15:29 PM
 * @desc: 弹出框组件封装
-->
<template>
  <div class="sectionDialog">
    <el-dialog title="提示" :visible.sync="sectionDialogVisible">
      <slot></slot>
      <!-- <el-form :model="sectionForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-select v-model="sectionForm.status" placeholder="请选择">
            <el-option label="已隐藏" :value="0">
            </el-option>
            <el-option label="待更新" :value="1">
            </el-option>
            <el-option label="已更新" :value="2">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSection">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'

export default vue.extend({
  name: 'sectionDialog',
  components: {},
  props: {},
  data() {
    return {
      sectionDialogVisible: true
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
