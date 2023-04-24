<!--
 * @author: SumO
 * @create: 2022-12-25 14:23 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 19:08 PM
 * @desc: 课程内容
-->
<template>
  <div class="selection">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size:17px;">
          <i @click="handleBack" class="el-icon-back" style="cursor: pointer">&nbsp;返回</i>
          <span style="margin: 0 10px;">|</span>
          <span style="font-weight: bold;">{{ courseName }}</span>
        </span>
        <el-button @click="addSection" style="float: right;" type="primary"><i class="el-icon-plus" /> 添加阶段</el-button>
      </div>
      <div>
        <el-tree @node-drop="handleSort" :allow-drop="handlDrop" :data="seletions" :props="defaultProps" draggable>
          <div class="inner" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-if="data.sectionName || (!data.sectionName && !data.theme)">
              <el-button size="mini" @click.stop="eidtSection(node, data)">编辑</el-button>
              <el-button size="mini" @click.stop="addClassInfo(node, data)" type="primary">添加课时</el-button>
              <el-button size="mini" @click.stop="eidtSectionStatus(node, data)">
                {{ data.status === 2 ? '已更新' : data.status === 1 ? '待更新' : '已隐藏' }}
              </el-button>
            </span>
            <span v-if="data.theme">
              <el-button size="mini" @click.stop="editClassInfo(node, data)">编辑</el-button>
              <el-button size="mini" @click.stop="addVideo(node, data)" type="success">上传视频</el-button>
              <el-button size="mini" @click.stop="eidtClassStatus(node, data)">
                {{ data.status === 2 ? '已更新' : data.status === 1 ? '待更新' : '已隐藏' }}
              </el-button>
            </span>
          </div>
        </el-tree>
      </div>
    </el-card>
    <el-dialog title="章节信息" :visible.sync="sectionDialogVisible">
      <el-form :model="sectionForm">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input disabled v-model="sectionForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="sectionForm.sectionName"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" :label-width="formLabelWidth">
          <el-input v-model="sectionForm.description"></el-input>
        </el-form-item>
        <el-form-item label="章节排序" :label-width="formLabelWidth">
          <el-input v-model="sectionForm.orderNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditSection">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="课时基本信息" :visible.sync="classIofoDialogVisible">
      <el-form :model="classInfoFrom">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input disabled v-model="classInfoFrom.courseName"></el-input>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input disabled v-model="classInfoFrom.sectionName"></el-input>
        </el-form-item>
        <el-form-item label="课时名称" :label-width="formLabelWidth">
          <el-input v-model="classInfoFrom.theme"></el-input>
        </el-form-item>
        <el-form-item label="时长" :label-width="formLabelWidth">
          <el-input v-model="classInfoFrom.duration"></el-input>
        </el-form-item>
        <el-form-item label="是否开启试听" :label-width="formLabelWidth">
          <el-switch v-model="classInfoFrom.isFree" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="课时排序" :label-width="formLabelWidth">
          <el-input type='number' v-model="classInfoFrom.orderNum"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="classIofoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditClass">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="sectionStatusVisible" width="30%">
      <el-form :model="sectionForm">
        <span style="text-align:center;">
          <i class="el-icon-info">
          </i>
          <div style="font-size: 20px;margin-bottom: 10px;">当前状态为: {{ sectionStatus }}</div>
        </span>
        <el-form-item label="状态变更为" :label-width="formLabelWidth">
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
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="classStatusVisible" width="30%">
      <el-form :model="sectionForm">
        <span style="text-align:center;">
          <i class="el-icon-info">
          </i>
          <div style="font-size: 20px;margin-bottom: 10px;">当前状态为: {{ classStatus }}</div>
        </span>
        <el-form-item label="状态变更为" :label-width="formLabelWidth">
          <el-select v-model="classInfoFrom.status" placeholder="请选择">
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
        <el-button @click="classStatusVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditClass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getLessons, saveOrUpdateSection, saveOrUpdate, getCourseById } from '@/services/course'
export default vue.extend({
  name: 'selection',
  components: {},
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      seletions: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme
        }
      },
      sectionDialogVisible: false,
      classIofoDialogVisible: false,
      sectionStatusVisible: false,
      classStatusVisible: false,
      sectionForm: {
        courseId: null,
        sectionName: '',
        courseName: '',
        description: '',
        orderNum: '',
        status: 0
      },
      classInfoFrom: {
        courseId: null,
        courseName: '',
        duration: '',
        isFree: false,
        orderNum: 0,
        sectionId: null,
        sectionName: '',
        theme: '',
        status: 0
      },
      formLabelWidth: '120px',
      courseName: '',
      sectionStatus: '',
      classStatus: ''
    }
  },
  created() {
    this.loadLessons()
    this.loadCourseById()
  },
  methods: {
    async loadLessons() {
      const { data } = await getLessons(this.courseId)
      this.seletions = data.data
    },
    handlDrop(draggingNode: any, dropNode: any, type: any) {
      // 不让节点拖动到节点内部
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    },
    async handleSort(dragNode: any, dropNode: any) {
      try {
        await Promise.all(dropNode.parent.childNodes.map((item: any, index: number) => {
          if (dragNode.data.sectionName) {
            // 阶段
            return saveOrUpdateSection({
              id: item.data.id,
              orderNum: index + 1
            })
          } else {
            // 课时
            return saveOrUpdate({
              id: item.data.id,
              orderNum: index + 1
            })
          }
        }))
        this.loadLessons()
        this.$message.success('排序成功')
      } catch (error) {
        this.$message.error('排序失败')
      }
    },
    async loadCourseById() {
      const { data } = await getCourseById(this.courseId)
      this.sectionForm.courseName = data.data.courseName
      this.courseName = data.data.courseName
      this.sectionForm.courseId = this.courseId as never
    },
    addSection() {
      this.sectionDialogVisible = true
      this.sectionForm.sectionName = ''
      this.sectionForm.description = ''
      this.sectionForm.orderNum = ''
    },
    eidtSection(node: any, data: any) {
      console.log(node, 'node')
      console.log(data, 'data')
      this.sectionDialogVisible = true
      this.sectionForm = JSON.parse(JSON.stringify(data))
      this.sectionForm.courseName = this.courseName
    },
    async addOrEditSection() {
      const { data } = await saveOrUpdateSection(this.sectionForm)
      if (data.code === '000000') {
        this.sectionDialogVisible = false
        this.sectionStatusVisible = false
        this.$message.success('保存成功')
        this.loadLessons()
      } else {
        this.$message.error(data.mesg)
      }
    },
    eidtSectionStatus(node: any, data: any) {
      this.sectionStatusVisible = true
      this.sectionStatus = data.status === 2 ? '已更新' : data.status === 1 ? '待更新' : '已隐藏'
      this.sectionForm = JSON.parse(JSON.stringify(data))
      this.sectionForm.courseName = this.courseName
    },
    addClassInfo(node: any, data: any) {
      this.classIofoDialogVisible = true
      this.classInfoFrom = {
        courseId: this.courseId as never,
        courseName: this.courseName,
        sectionName: data.sectionName,
        sectionId: data.id,
        duration: '',
        isFree: false,
        orderNum: 0,
        theme: '',
        status: 0
      }
    },
    editClassInfo(node: any, data: any) {
      this.classIofoDialogVisible = true
      this.classInfoFrom = JSON.parse(JSON.stringify(data))
      this.classInfoFrom.courseName = this.courseName
      this.classInfoFrom.courseId = this.courseId as never
    },
    async addOrEditClass() {
      const { data } = await saveOrUpdate(this.classInfoFrom)
      if (data.code === '000000') {
        this.classIofoDialogVisible = false
        this.classStatusVisible = false
        this.$message.success('保存成功')
        this.loadLessons()
      } else {
        this.$message.error(data.mesg)
      }
    },
    eidtClassStatus(node: any, data: any) {
      this.classStatusVisible = true
      this.classStatus = data.status === 2 ? '已更新' : data.status === 1 ? '待更新' : '已隐藏'
      this.classInfoFrom = JSON.parse(JSON.stringify(data))
      this.classInfoFrom.courseName = this.courseName
      this.classInfoFrom.courseId = this.courseId as never
    },
    addVideo(node: any, data: any) {
      this.$router.push({
        name: 'videoAdd',
        params: {
          courseId: this.courseId as any
        },
        query: {
          sectionId: node.parent.id,
          lessonId: data.id
        }
      })
    },
    handleBack() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
.inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 9px;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.el-icon-info {
  font-size: 50px;
  display: block;
  margin-bottom: 20px;
}

::v-deep .el-tree-node__content {
  height: auto;
  // padding: 5px 0;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
