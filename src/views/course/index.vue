<!--
 * @author: SumO
 * @create: 2022-12-07 15:18 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-25 16:57 PM
 * @desc:课程管理
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <div style="padding-top: 20px;">
            <el-form-item label="课程名称" props="phone">
              <el-input v-model="formInline.courseName"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.status" placeholder="请选择">
                <el-option key="1" label="上架" :value="1">
                </el-option>
                <el-option key="0" label="下架" :value="0">
                </el-option>
                <el-option key="2" label="全部" :value="null">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button @click="onSubmit">查询</el-button>
          </div>
          <el-button type="primary" @click="createCourse">+ 新建课程</el-button>
        </el-form>
      </div>
      <div class="text item">
        <el-table size="medium" :data="tableData" style="width: 100%;margin-bottom: 10px;">
          <el-table-column prop="id" label="课程ID">
          </el-table-column>
          <el-table-column prop="courseName" label="课程名称">
          </el-table-column>
          <el-table-column prop="price" label="价格">
          </el-table-column>
          <el-table-column prop="sortNum" label="排序">
          </el-table-column>
          <el-table-column align="center" prop="status" label="状态">
            <template slot-scope="scope">
              <i v-if="scope.row.status >= 1" class="statu statu-success"></i>
              <i v-if="scope.row.status === 0" class="statu statu-error"></i>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300">
            <template slot-scope="scope">
              <el-button v-if="scope.row.status >= 1" size="mini" type="danger"
                @click="offUser(scope.row)">下架</el-button>
              <el-button v-if="scope.row.status === 0" size="mini" type="success"
                @click="offUser(scope.row)">上架</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" @click="contentManage(scope.row)">内容管理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="currentPageIndex" :page-sizes="[10, 15, 20]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default vue.extend({
  name: 'course',
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        courseName: null,
        status: null,
        currentPage: 1,
        pageSize: 10
      },
      total: 100,
      currentPageIndex: 1,
      tableData: [],
      isCreate: false
    }
  },
  created() {
    this.loadQueryCourses()
    this.isCreate = false
  },
  methods: {
    async loadQueryCourses() {
      const { data } = await getQueryCourses(this.formInline)
      this.tableData = data.data.records
      this.total = data.data.total
    },
    handleSizeChange(val: number) {
      this.currentPageIndex = 1
      this.formInline.pageSize = val
      this.loadQueryCourses()
    },
    handleCurrentChange(val: number) {
      this.formInline.currentPage = val
      this.loadQueryCourses()
    },
    onSubmit() {
      this.currentPageIndex = 1
      this.formInline.currentPage = 1
      this.loadQueryCourses()
    },
    async offUser(row: any) {
      // console.log(row)
      const { data } = await changeState({
        courseId: row.id,
        status: row.status >= 1 ? 0 : 1
      })
      if (data.code === '000000') {
        this.$message.success(`${row.status >= 1 ? '下架' : '上架'}成功`)
        this.loadQueryCourses()
      }
    },
    handleEdit(row: any) {
      this.$router.push({
        name: 'course-create',
        params: {
          crouseId: row.id
        }
      })
    },
    contentManage(row: any) {
      this.$router.push({
        name: 'course-selection',
        params: {
          courseId: row.id
        }
      })
    },
    createCourse() {
      this.$router.push({
        name: 'course-create'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.demo-form-inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
