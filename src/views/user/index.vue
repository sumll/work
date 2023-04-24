<!--
 * @author: SumO
 * @create: 2022-12-07 15:18 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-18 18:14 PM
 * @desc:用户管理
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <div>
            <el-form-item label="手机号" props="phone">
              <el-input v-model="formInline.phone"></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
              <el-date-picker v-model="startAndEndTime" type="datetimerange" range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="form-btn">
            <el-button @click="resetForm">重置</el-button>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </div>
        </el-form>
      </div>
      <div class="text item">
        <el-table size="small" :data="tableData" style="width: 100%;margin-bottom: 10px;">
          <el-table-column prop="id" label="用户ID">
          </el-table-column>
          <el-table-column prop="portrait" label="头像">
            <template slot-scope="scope">
              <el-avatar :size="40"
                :src="scope.row.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="用户名">
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间" width="180">
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态">
            <template slot-scope="scope">
              <i v-if="scope.row.status === 'ENABLE'" class="statu statu-success"></i>
              <i v-if="scope.row.status === 'ABLE'" class="statu statu-err"></i>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="offUser(scope.row)">禁用</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPageIndex" :page-sizes="[10, 15, 20]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog :open="loadRoleIdAll" title="分配角色" :visible.sync="dialogVisible" width="30%">
        <el-select v-model="roleForm.roleIdList" multiple placeholder="请选择" size="small" style="width:80%;">
          <el-option v-for="item in roleOptions" :key="item['id']" :label="item['name']" :value="item['id']">
          </el-option>
        </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subAllocateUserRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getUserPages, forbidUser } from '@/services/user'
import { getRoleAll, allocateUserRoles, getRoleIdAll } from '@/services/role'
export default vue.extend({
  name: 'user',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        phone: null,
        startCreateTime: null,
        endCreateTime: null,
        pageSize: 10,
        currentPage: 1
      },
      startAndEndTime: null,
      tableData: [],
      total: 100,
      currentPageIndex: 1,
      dialogVisible: false,
      roleOptions: [],
      roleForm: {
        userId: 0,
        roleIdList: []
      }
    }
  },
  watch: {
    startAndEndTime(newStr) {
      if (newStr) {
        this.formInline.startCreateTime = new Date(newStr[0].getFullYear(), newStr[0].getMonth(), newStr[0].getDate()) as any
        this.formInline.endCreateTime = new Date(newStr[1].getFullYear(), newStr[1].getMonth(), newStr[1].getDate()) as any
      } else {
        this.formInline.startCreateTime = null
        this.formInline.endCreateTime = null
      }
    }
  },
  created() {
    this.loadUserPages()
    this.loadRoleAll()
  },
  methods: {
    onSubmit() {
      this.currentPageIndex = 1
      this.formInline.currentPage = 1
      this.loadUserPages()
    },
    async loadUserPages() {
      const { data } = await getUserPages(this.formInline)
      this.tableData = data.data.records
      this.total = data.data.total
    },
    // 分配角色
    handleEdit(row: any) {
      this.dialogVisible = true
      this.roleForm.userId = row.id
      this.loadRoleIdAll()
    },
    handleSizeChange(val: number) {
      this.currentPageIndex = 1
      this.formInline.pageSize = val
      this.loadUserPages()
    },
    handleCurrentChange(val: number) {
      this.formInline.currentPage = val
      this.loadUserPages()
    },
    resetForm() {
      this.formInline.phone = null
      this.startAndEndTime = null
    },
    // 禁用角色
    async offUser(row: any) {
      const { data } = await forbidUser(row.id)
      if (data.code === '000000') this.$message.success('禁用成功')
    },
    // 获取所有角色
    async loadRoleAll() {
      const { data } = await getRoleAll()
      this.roleOptions = data.data
    },
    // 给用户分配角色
    subAllocateUserRoles() {
      this.$confirm('确认添加角色吗？', '提示', {})
        .then(async() => {
          const { data } = await allocateUserRoles(this.roleForm)
          if (data.code === '000000') {
            this.$message.success('添加角色成功')
            this.dialogVisible = false
          }
        })
        .catch(() => {
          this.$message.info('已取消添加')
        })
    },
    // 获取已有角色
    async loadRoleIdAll() {
      const { data } = await getRoleIdAll(this.roleForm.userId)
      this.roleForm.roleIdList = data.data.map((user: any) => {
        return user.id
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-form-inline {
  display: flex;
  justify-content: space-between;
}

.statu {
  display: inline-block;
  cursor: pointer;
  width: 0.875rem;
  height: 0.875rem;
  vertical-align: middle;
  border-radius: 50%;
}

.statu-success {
  background-color: #51cf66;
}

.statu-error {
  background-color: red;
}
</style>
