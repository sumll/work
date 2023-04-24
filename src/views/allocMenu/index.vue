<!--
 * @author: SumO
 * @create: 2022-12-16 17:00 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-17 16:57 PM
 * @desc: 所有菜单分配
-->
<template>
  <div class="allocMenu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>菜单分配</span>

      </div>
      <div>
        <el-tree ref="menuRef" :data="data" show-checkbox node-key="id" default-expand-all
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
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui/types/element-ui'
export default vue.extend({
  name: 'allocMenu',
  components: {},
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      data: [],
      checkedKeys: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created() {
    this.loadMenuNodeList()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodeList() {
      const { data } = await getMenuNodeList()
      this.data = data.data
      // data.data.forEach((item: { id: any }) => (this.parentKeys as number[]).push(item.id))
    },
    async loadRoleMenus() {
      const { data } = await getRoleMenus(this.roleId)
      this.getchecKeys(data.data)
    },
    getchecKeys(menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedKeys.push(menu.id as never) 会导致视图不会更新
          this.checkedKeys = [...this.checkedKeys, menu.id] as any
        }
        if (menu.subMenuList) {
          this.getchecKeys(menu.subMenuList)
        }
      })
    },
    onSave() {
      const menuIdList = (this.$refs.menuRef as Tree).getCheckedKeys()
      this.$confirm('确认分配已勾选的菜单吗？', '提示', {})
        .then(async() => {
          const { data } = await allocateRoleMenus({
            roleId: this.roleId,
            menuIdList
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
      (this.$refs.menuRef as Tree).setCheckedKeys([])
    }

  }
})
</script>

<style lang="scss">
</style>
