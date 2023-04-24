<!--
 * @author: SumO
 * @create: 2022-12-14 17:11 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-15 16:35 PM
 * @desc: 资源列表
-->
<template>
  <div class='resource-list'>
    <el-card class='box-card'>
      <el-form :disabled="loading" ref="formInline" :rules="rules" :inline='true' :model='formInline'
        class='demo-form-inline'>
        <el-form-item label='资源名称' prop="name">
          <el-input size='small' v-model='formInline.name' placeholder='资源名称'></el-input>
        </el-form-item>
        <el-form-item label='资源路径' prop="url">
          <el-input size='small' v-model='formInline.url' placeholder='资源路径'></el-input>
        </el-form-item>
        <el-form-item label='资源分类' prop="categoryId">
          <el-select size='small' clearable v-model='formInline.categoryId' placeholder='全部'>
            <el-option v-for="item in loadCategoryIdList" :key="item['id']" :label="item['name']"
              :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <div class='func'>
          <el-form-item>
            <el-button size='small' type='primary' @click='onSubmit'>查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size='small' @click='resetForm'>重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class='box-card'>
      <el-button size='small' @click='handleAdd'>添加</el-button>
      <el-button size='small' @click="$router.push({ name: 'classify'})">资源分类</el-button>
    </el-card>
    <el-table v-loading="loading" :data='resourceList' border style="width: 100%;margin-bottom:10px;">
      <el-table-column align='center' prop='id' label='编号' width='100'>
      </el-table-column>
      <el-table-column align='center' prop='name' label='资源名称'>
      </el-table-column>
      <el-table-column align='center' prop='url' label='资源路径'>
      </el-table-column>
      <el-table-column align='center' prop='description' label='描述'>
      </el-table-column>
      <el-table-column align='center' prop='createdTime' label='添加时间'>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope['row'])">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :disabled="loading" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="formInline.current" :page-sizes="[5, 10, 20]" :page-size="10"
      layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog :title="isEdit ? '编辑资源' : '添加资源'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="资源名称" :label-width="formLabelWidth">
          <el-input size='small' v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源路径" :label-width="formLabelWidth">
          <el-input size='small' v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源分类" :label-width="formLabelWidth">
          <el-select size='small' v-model='form.categoryId'>
            <el-option v-for="item in loadCategoryIdList" :key="item['id']" :label="item['name']"
              :value="item['id']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源描述" :label-width="formLabelWidth">
          <el-input size='small' type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogFormVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="addResource">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getResourcePages, getCategoryId, saveOrUpdateResource, deleteResource } from '@/services/resource'
import { Form } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'resource-list',
  components: {},
  props: {},
  data() {
    return {
      resourceList: [],
      formInline: {
        name: '',
        url: '',
        categoryId: null,
        current: 1, // 第几页
        size: 10 // 每页数量
      },
      rules: {
        name: [
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        url: [
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      },
      // 总数
      total: 0,
      // 所有分类
      loadCategoryIdList: [],
      loading: false,
      dialogFormVisible: false,
      form: {
        id: null,
        name: '',
        categoryId: 1,
        url: '',
        description: ''
      },
      formLabelWidth: '150px',
      isEdit: false
    }
  },
  created() {
    this.loadResource()
    this.loadCategoryId()
  },
  methods: {
    addResource() {
      this.$confirm(`确认${this.isEdit ? '编辑' : '添加'}资源吗？`, '提示', {})
        .then(async() => {
          this.loadSaveOrUpdateResource()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 重置表单
    resetForm() {
      (this.$refs.formInline as Form).resetFields()
    },
    onSubmit() {
      // 查询从第一页开始
      this.formInline.current = 1
      this.loadResource()
    },
    // 获取资源信息
    async loadResource() {
      this.loading = true
      const { data } = await getResourcePages(this.formInline)
      this.resourceList = data.data.records
      this.total = data.data.total
      this.loading = false
    },
    // 添加或编辑资源表单
    async loadSaveOrUpdateResource() {
      const { data } = await saveOrUpdateResource(this.form)
      if (data.code === '000000') {
        this.dialogFormVisible = false
        this.$message.success(`${this.isEdit ? '编辑' : '添加'}成功`)
        this.form.id = null
        this.loadResource()
      }
    },
    // 增加资源
    handleAdd() {
      this.isEdit = false
      this.dialogFormVisible = true
      this.form.id = null
      this.form.name = ''
      this.form.categoryId = 1
      this.form.url = ''
      this.form.description = ''
    },
    handleEdit(row: any) {
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.name = row.name
      this.form.categoryId = row.categoryId
      this.form.url = row.url
      this.form.description = row.description
    },
    // 删除资源
    async handleDelete(row: any) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(async() => {
          const { data } = await deleteResource(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadResource()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleSizeChange(val: number) {
      this.formInline.size = val
      this.formInline.current = 1
      this.loadResource()
    },
    handleCurrentChange(val: number) {
      this.formInline.current = val
      this.loadResource()
    },
    async loadCategoryId() {
      const { data } = await getCategoryId()
      this.loadCategoryIdList = data.data
    }
  }
})
</script>

<style lang='scss' scoped>
.resource-list {
  .box-card {
    margin-bottom: 1px;

    .demo-form-inline {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}
</style>
