<!--
 * @author: SumO
 * @create: 2022-12-07 14:38 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 19:30 PM
 * @desc: 侧边栏
-->
<template>
  <div class='appAside'>
    <el-menu router :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
      background-color="#545c64" :collapse="isCollapse" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/role">
          <i class="el-icon-setting"></i>
          <span slot="title">角色列表</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <i class="el-icon-setting"></i>
          <span slot="title">菜单列表</span>
        </el-menu-item>
        <el-menu-item index="/resource">
          <i class="el-icon-setting"></i>
          <span slot="title">资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item index="/advert">
          <i class="el-icon-setting"></i>
          <span slot="title">广告列表</span>
        </el-menu-item>
        <el-menu-item index="/advertSpace">
          <i class="el-icon-setting"></i>
          <span slot="title">广告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import bus from '@/utils/bus'
import { getUserPermissions } from '@/services/user'
export default vue.extend({
  name: 'appAside',
  components: {},
  props: {},
  data() {
    return {
      isCollapse: false,
      defaultActive: '/course'
    }
  },
  methods: {
    handleOpen(key: string, keyPath: string[]): void {
      console.log(key, keyPath)
    },
    handleClose(key: string, keyPath: string[]): void {
      console.log(key, keyPath)
    },
    async getUserMenus() {
      const { data } = await getUserPermissions()
      console.log(data, 'sisi')
    }
  },
  created() {
    bus.$on('isCloseChange', (value: boolean) => {
      this.isCollapse = value
    })
    this.defaultActive = this.$route.fullPath
    this.getUserMenus()
  }
})
</script>

<style lang="scss" scoped>
.appAside {
  .el-menu {
    min-height: 100vh;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
}
</style>
