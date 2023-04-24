<!--
 * @author: SumO
 * @create: 2022-12-07 15:16 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-13 19:16 PM
 * @desc:菜单管理
-->
<template>
  <div class="menu">
    <el-card class="box-card">
      <div class="clearfix">
        <el-button @click="$router.push({
          name: 'menu-create'
        })">添加菜单</el-button>
      </div>
    </el-card>
    <div class="menu-table">
      <el-table  border :data="tableData" style="width: 100%">
        <el-table-column width="100" align="center" type="index" label="编号">
        </el-table-column>
        <el-table-column width="180" align="center" prop="name" label="菜单名称">
        </el-table-column>
        <el-table-column width="180" align="center" prop="level" label="菜单级数">
        </el-table-column>
        <el-table-column width="180" align="center" prop="icon" label="前端图标">
        </el-table-column>
        <el-table-column width="180" align="center" prop="orderNum" label="排序">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope['row'])">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getAllMenus, deleteMenu } from '@/services/menu'
export default vue.extend({
  name: 'Menu',
  components: {},
  props: {},
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus() {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    },
    handleEdit(row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete(row: any) {
      this.$confirm('确认删除吗？', '提示', {})
        .then(async() => {
          const { data } = await deleteMenu(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenus()
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
