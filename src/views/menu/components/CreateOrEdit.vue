<!--
 * @author: SumO
 * @create: 2022-12-13 15:21 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-13 18:54 PM
 * @desc: 组件
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
      </div>
      <div class="menu-form">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="href">
            <el-input v-model="form.href"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="parentId">
            <el-select v-model="form.parentId">
              <el-option label="无上级菜单" :value="-1"></el-option>
              <el-option v-for="menu in parentMenuList" :key="menu['id']" :label="menu['name']"
                :value="menu['id']"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="前端图标" prop="icon">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-radio-group v-model="form.show">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" prop="orderNum">
            <el-input-number v-model="form.orderNum" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu'
import { Form } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'CreateOrEdit',
  components: {},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        show: false
      },
      rules: {
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入菜单描述', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      },
      parentMenuList: []
    }
  },
  methods: {
    async onSubmit() {
      this.$confirm('确认提交吗？', '提示', {})
        .then(async() => {
          const { data } = await createOrUpdateMenu(this.form)
          if (data.code === '000000') {
            this.$router.back()
            this.$message.success('提交成功')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    async loadMenuInfo() {
      const { data } = await getEditMenuInfo(this.$route.params.id || -1)
      if (data.data.menuInfo) this.form = data.data.menuInfo
      if (data.code === '000000') {
        this.parentMenuList = data.data.parentMenuList
      }
    },
    resetForm() {
      (this.$refs.form as Form).resetFields()
    }
  },
  created() {
    this.loadMenuInfo()
  }
})
</script>

<style lang="scss" scoped>

</style>
