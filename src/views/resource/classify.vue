<!--
 * @author: SumO
 * @create: 2022-12-15 16:01 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-15 17:08 PM
 * @desc: 资源分类
-->
<template>
  <div>
    <el-card class="box-card">
      <div class="clearfix">
        <el-button @click="handleAdd">添加分类</el-button>
      </div>
    </el-card>
    <div class="menu-table">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column align="center" type="index" label="编号">
        </el-table-column>
        <el-table-column align="center" prop="name" label="名称">
        </el-table-column>
        <el-table-column align="center" prop="createdTime" label="创建时间">
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope['row'])">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="isEdit ? '编辑资源' : '添加资源'" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" label-position="top">
        <el-form-item label="资源名称">
          <el-input size='small' v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" :max="9999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogFormVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="loadCategorySaveOrderUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getCategoryId, categorySaveOrderUpdate, deleteCategory } from '@/services/resource'
export default vue.extend({
  name: 'classify',
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      form: {
        name: '',
        sort: 0,
        id: null
      },
      isEdit: false,
      dialogFormVisible: false

    }
  },
  created() {
    this.loadgetCategoryId()
  },
  methods: {
    async loadgetCategoryId() {
      const { data } = await getCategoryId()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    },
    async loadCategorySaveOrderUpdate() {
      this.$confirm(`确认${this.isEdit ? '编辑' : '添加'}资源吗？`, '提示', {})
        .then(async() => {
          const { data } = await categorySaveOrderUpdate(this.form)
          if (data.code === '000000') {
            this.dialogFormVisible = false
            this.$message.success(`${this.isEdit ? '编辑' : '添加'}成功`)
            this.form.id = null
            this.loadgetCategoryId()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleAdd() {
      this.isEdit = false
      this.dialogFormVisible = true
      this.form.name = ''
      this.form.sort = 0
      this.form.id = null
    },
    handleEdit(row: any) {
      this.isEdit = true
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.sort = row.sort
      this.form.id = row.id
    },
    async handleDelete(row: any) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(async() => {
          const { data } = await deleteCategory(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadgetCategoryId()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
