<!--
 * @author: SumO
 * @create: 2022-12-16 15:28 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-16 17:23 PM
 * @desc: 角色列表
-->
<template>
  <div class='role-list'>
    <el-card class='box-card'>
      <el-form :disabled="loading" ref="formInline" :inline='true' :model='formInline' class='demo-form-inline'>
        <el-form-item label='输入搜索' prop="name">
          <el-input size='small' v-model='formInline.name' placeholder='角色名称'></el-input>
        </el-form-item>
        <div>
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
      <el-button size='small' @click='handleAdd'>添加角色</el-button>
    </el-card>
    <el-table v-loading="loading" :data='roleList' border style="width: 100%;margin-bottom:10px;">
      <el-table-column align='center' prop='id' label='编号' width='100'>
      </el-table-column>
      <el-table-column align='center' prop='name' label='角色名称'>
      </el-table-column>
      <el-table-column align='center' prop='description' label='描述'>
      </el-table-column>
      <el-table-column align='center' prop='createdTime' label='添加时间'>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="text" @click="assignmentMenu(scope['row'])">分配菜单</el-button>
            <el-button size="mini" type="text" @click="assignmentResource(scope['row'])">分配资源</el-button>
          </div>
          <div>
            <el-button size="mini" type="text" @click="handleEdit(scope['row'])">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :disabled="loading" @current-change="handleCurrentChange" :current-page.sync="formInline.current"
      :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog :title="isEdit ? '编辑资源' : '添加资源'" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" ref="form" :rules='rules' label-position="right">
        <el-form-item label="资源名称" prop="name">
          <el-input size='small' v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input size='small' v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="资源描述"  prop="description">
          <el-input size='small' type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size='small' @click="dialogFormVisible = false">取 消</el-button>
        <el-button size='small' type="primary" @click="addResource" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getRolePages, saveOrUpdateRole, deleteRole } from '@/services/role'
import { Form } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'role-list',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      roleList: [],
      // 搜索表单
      formInline: {
        name: '',
        current: 1, // 第几页
        size: 10 // 每页数量
      },
      // 添加或编辑表单
      form: {
        name: '',
        code: '',
        description: '',
        id: null
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色编号', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      },
      total: 100,
      dialogFormVisible: false,
      formLabelWidth: 100,
      isEdit: false
    }
  },
  created() {
    this.loadRolePages()
  },
  methods: {
    // 分配菜单
    assignmentMenu(row: any) {
      this.$router.push({
        name: 'allocMenu',
        params: {
          roleId: row.id
        }
      })
    },
    // 分配资源
    assignmentResource(row: any) {
      this.$router.push({
        name: 'allocResource',
        params: {
          roleId: row.id
        }
      })
    },
    // 获取角色信息
    async loadRolePages() {
      this.loading = true
      const { data } = await getRolePages(this.formInline)
      this.roleList = data.data.records
      this.total = data.data.total
      this.loading = false
    },
    async loadSaveOrUpdateRole() {
      try {
        this.loading = true
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateRole(this.form)
        if (data.code !== '000000') {
          this.dialogFormVisible = false
          this.$message.success(`${this.isEdit ? '编辑' : '添加'}成功`)
          this.form.id = null
          this.loadRolePages()
        }
      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: '校验失败,请重新输入'
        })
        this.loading = false
      }
    },
    // 编辑或添加表单提交
    addResource() {
      this.$confirm(`确认${this.isEdit ? '编辑' : '添加'}资源吗？`, '提示', {})
        .then(async() => {
          this.loadSaveOrUpdateRole()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 删除角色
    handleDelete(row: any) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(async() => {
          const { data } = await deleteRole(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRolePages()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 编辑角色
    handleEdit(row: any) {
      this.dialogFormVisible = true
      this.form = row
      this.isEdit = true
    },
    // 添加角色
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {
        name: '',
        code: '',
        description: '',
        id: null
      }
      this.isEdit = false
    },
    // 搜索插查询
    onSubmit() {
      this.loadRolePages()
    },
    // 搜索表单重置
    resetForm() {
      console.log('resetForm')
    },
    handleCurrentChange(num: number) {
      this.formInline.current = num
      this.loadRolePages()
    }
  }
})
</script>

<style lang="scss" scoped>
.role-list {
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
