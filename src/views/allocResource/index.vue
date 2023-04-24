<!--
 * @author: SumO
 * @create: 2022-12-16 17:02 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-17 17:49 PM
 * @desc:所有资源分配
-->
<template>
  <div class="allocResource">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>资源分配</span>

      </div>
      <div>
        <el-tree ref="resourceRef" :data="reworkTreeNode" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="checkedKeys" :props="defaultProps">
        </el-tree>
        <div style="text-align: center;">
          <el-button type="primary" @click="onSave">保存</el-button>
          <el-button @click="resetChecked">清空</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { getResourceAll, getCategoryId, allocateRoleResources, getRoleResources } from '@/services/resource'
import { Tree } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'allocResource',
  components: {},
  props: {
    roleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      checkedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      parentTreeNode: [],
      allTreeNode: [],
      reworkTreeNode: []
    }
  },
  created() {
    this.loadResourceAll()
    this.loadRoleResources()
    // setTimeout(() => {
    //   this.reworkData()
    // }, 2000)
    // console.log(this.$route)
  },
  methods: {
    // 获取已拥有的资源列表
    async loadRoleResources() {
      const { data } = await getRoleResources(this.roleId)
      this.getchecKeys(data.data)
    },
    getchecKeys(resources: any) {
      resources.forEach((resource: any) => {
        if (resource.selected) {
          // this.checkedKeys.push(menu.id as never) 会导致视图不会更新
          this.checkedKeys = [...this.checkedKeys, resource.id] as any
        }
        if (resource.resourceList) {
          this.getchecKeys(resource.resourceList)
        }
      })
    },
    // 获取所有资源列表
    async loadResourceAll() {
      const { data } = await getResourceAll()
      this.allTreeNode = data.data
      this.loadCategoryIdAll()
    },
    // 获取所有风分类
    async loadCategoryIdAll() {
      const { data } = await getCategoryId()
      this.parentTreeNode = data.data
      this.reworkTreeNode = this.reworkData() as any
    },
    // 重新组织资源数结构
    reworkData() {
      const result = []
      for (let i = 0; i < this.parentTreeNode.length; i++) {
        const obj = {
          name: (this.parentTreeNode[i] as any).name,
          id: (this.parentTreeNode[i] as any).id,
          selected: (this.parentTreeNode[i] as any).selected,
          children: []
        }
        for (let j = 0; j < this.allTreeNode.length; j++) {
          if ((this.parentTreeNode[i] as any).id === (this.allTreeNode[j] as any).categoryId) {
            obj.children.push(this.allTreeNode[j])
          }
        }
        result.push(obj)
      }
      return result
    },
    onSave() {
      const resourceIdList = [...new Set((this.$refs.resourceRef as Tree).getCheckedKeys())]
      this.$confirm('确认分配已勾选的资源吗？', '提示', {})
        .then(async() => {
          const { data } = await allocateRoleResources({
            roleId: this.roleId,
            resourceIdList
          })
          if (data.code === '000000') {
            this.$message.success('分配成功')
            this.$router.back()
          }
        })
        .catch(() => {
          this.$message.info('已取消分配')
        })
    },
    resetChecked() {
      (this.$refs.resourceRef as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
