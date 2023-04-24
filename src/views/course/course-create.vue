<!--
 * @author: SumO
 * @create: 2022-12-20 16:45 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 20:13 PM
 * @desc: 新建课程
-->
<template>
  <div class="course-create">
    <!-- <div class="create-header">
      <div style="cursor: pointer;" @click="handleBack">
        <i class="el-icon-back"></i>
        <span>返回</span>
      </div>
      <el-button type="primary">保存</el-button>
    </div> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="header-back">
          <i @click="handleBack" class="el-icon-back" style="cursor: pointer">&nbsp;返回</i>|
          <span style="font-weight: bold;">{{ crouseId ? '编辑课程' : '新增课程'}}</span>
        </div>
        <el-steps :active="activeStep" simple>
          <el-step v-for="(item, index) in steps" :key="item.title" :title="item.title" :icon="item.icon"
            @click.native="activeStep = index"></el-step>
        </el-steps>
      </div>
      <div class="text item">
        <el-form :rules="rules" ref="form" :model='form'>
          <div v-show="activeStep === 0">
            <el-form-item label="名称" label-width="140px" prop="courseName">
              <el-input :maxlength="50" show-word-limit v-model="form.courseName"></el-input>
            </el-form-item>
            <el-form-item label="简介" label-width="140px" prop="brief">
              <el-input :maxlength="100" show-word-limit v-model="form.brief"></el-input>
            </el-form-item>
            <el-form-item label="讲师姓名" label-width="140px" prop="teacherDTO.teacherName">
              <el-input :maxlength="50" show-word-limit v-model="form.teacherDTO.teacherName"></el-input>
            </el-form-item>
            <el-form-item label="职位" label-width="140px" prop="teacherDTO.position">
              <el-input :maxlength="50" show-word-limit v-model="form.teacherDTO.position"></el-input>
            </el-form-item>
            <el-form-item label="讲师简介" label-width="140px" prop="teacherDTO.description">
              <el-input :maxlength="100" show-word-limit v-model="form.teacherDTO.description"></el-input>
            </el-form-item>
            <el-form-item label="课程概述" label-width="140px">
              <div style="display:flex;justify-content: space-between;">
                <el-input :maxlength="20" show-word-limit placeholder="概述1" type="textarea"
                  v-model="form.previewFirstField" style="width:49%;"></el-input>
                <el-input :maxlength="20" show-word-limit placeholder="概述2" type="textarea"
                  v-model="form.previewSecondField" style="width:49%;"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="课程排序" label-width="140px" prop="sortNum">
              <el-input-number v-model="form.sortNum" :min="1" :max="999999999"></el-input-number>
            </el-form-item>
          </div>
          <div v-show="activeStep === 1">
            <el-form-item label="课程封面" label-width="140px">
              <courseImage v-model="form.courseListImg" />
            </el-form-item>
            <el-form-item label="介绍封面" label-width="140px">
              <courseImage v-model="form.courseImgUrl" />
            </el-form-item>

          </div>
          <div v-show="activeStep === 2">
            <el-form-item label="售卖价格" label-width="140px" prop="discounts">
              <el-input type="number" v-model="form.discounts">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="商品原价" label-width="140px">
              <el-input type="number" v-model="form.price">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="销量" label-width="140px">
              <el-input type="number" v-model="form.sales">
                <template slot="append">单</template>
              </el-input>
            </el-form-item>
            <el-form-item label="优惠标签" label-width="140px">
              <el-input :maxlength="4" show-word-limit v-model="form.discountsTag"></el-input>
            </el-form-item>
          </div>
          <div v-show="activeStep === 3">
            <el-form-item label="限时秒杀开关" label-width="140px">
              <el-switch v-model="form.activityCourse" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item v-if="form.activityCourse" label="开始时间" label-width="140px">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.activityCourseDTO.beginTime" type="date"
                placeholder="选择活动开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="form.activityCourse" label="结束时间" label-width="140px">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.activityCourseDTO.endTime" type="date"
                placeholder="选择活动结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item v-if="form.activityCourse" label="秒杀价" label-width="140px">
              <el-input type="number" v-model="form.activityCourseDTO.amount">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.activityCourse" label="秒杀库存" label-width="140px">
              <el-input-number v-model="form.activityCourseDTO.stock" :min="10" :max="9999">
                <template slot="append">个</template>
              </el-input-number>
            </el-form-item>
          </div>
          <div v-show="activeStep === 4">
            <!-- <el-form-item label="课程详情" label-width="140px">
              <el-input type="textarea" v-model="form.courseDescriptionMarkDown">
              </el-input>
            </el-form-item> -->
            <Editor v-model="form.courseDescriptionMarkDown"></Editor>
          </div>
          <el-form-item style="text-align:center;margin-top: 10px;">
            <el-button v-if="activeStep > 0 && activeStep <= 4" @click="activeStep--">上一步</el-button>
            <el-button v-if="activeStep >= 0 && activeStep < 4" @click="activeStep++">下一步</el-button>
            <el-button :loading="loading" v-if="activeStep === 4" type="primary" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import courseImage from './components/courseImage.vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
import Editor from './components/editor.vue'
import { Form } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'course-create',
  components: {
    courseImage,
    Editor
  },
  props: {
    crouseId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-edit' },
        { title: '销售信息', icon: 'el-icon-edit' },
        { title: '秒杀活动', icon: 'el-icon-edit' },
        { title: '课程详情', icon: 'el-icon-edit' }
      ],
      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 50, message: '请输入2-50个字符' }
        ],
        brief: [
          { required: true, message: '请输入课程简介', trigger: 'blur' },
          { min: 3, max: 100, message: '请输入2-100个字符' }
        ],
        'teacherDTO.teacherName': [
          { required: true, message: '请输入讲师姓名', trigger: 'blur' },
          { min: 2, max: 50, message: '请输入2-50个字符' }
        ],
        'teacherDTO.position': [
          { required: true, message: '请输入讲师职位', trigger: 'blur' },
          { min: 2, max: 50, message: '请输入2-50个字符' }
        ],
        'teacherDTO.description': [
          { required: true, message: '请输入讲师简介', trigger: 'blur' },
          { min: 3, max: 100, message: '请输入2-100个字符' }
        ],
        discounts: [
          { required: true, message: '请输入售卖价格', trigger: 'blur' }
        ]
      },
      form: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: null,
        discounts: null,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 1,
        previewFirstField: '',
        previewSecondField: '',
        status: 0,
        sales: null,
        activityCourse: false,
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: null,
          stock: 0
        },
        autoOnlineTime: ''
      },
      imageUrl: '',
      isSeckill: false,
      loading: false
    }
  },
  created() {
    if (this.crouseId) {
      this.loadCourseInfo()
    }
  },
  methods: {
    async handleSave() {
      try {
        this.loading = true
        await (this.$refs.form as Form).validate()
        const { data } = await saveOrUpdateCourse(this.form)
        if (data.code !== '000000') {
          this.$message.error(data.mesg)
        } else {
          this.$message.success(`${this.crouseId ? '修改' : '新增'}成功`)
          this.$router.back()
        }
        this.loading = false
      } catch (error) {
        console.log(error)
        this.$notify.error({
          title: '错误',
          message: '校验失败, 请重新输入'
        })
        this.loading = false
      }
    },
    async loadCourseInfo() {
      const { data } = await getCourseById(this.crouseId)
      if (data.code === '000000') this.form = data.data
    },
    handleBack() {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;

}

.header-back {
  width: 160px;
  font-size: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

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

// .create-header {
//   display: flex;
//   justify-content: space-between;
//   line-height: 40px;
//   .el-icon-back {
//     padding-right: 5px;
//     font-size:20px;
//     // padding: 10px 5px 0 0;
//   }
// }
</style>
