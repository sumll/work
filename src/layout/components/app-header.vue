<!--
 * @author: SumO
 * @create: 2022-12-07 15:32 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-01-13 19:49 PM
 * @desc: 网页头部
-->
<template>
  <div class="appHeader">
    <div class="headerNav">
      <el-button v-if="isCollapse" class="hamburger" icon="el-icon-s-unfold" @click="handleClick(false)"></el-button>
      <el-button v-if="!isCollapse" class="hamburger" icon="el-icon-s-fold" @click="handleClick(true)"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{ path: item.path }">{{
            item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square" :size="40"
          :src="userInfo.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import { Route, RouteRecord } from 'vue-router'
import { getUserInfo, logout } from '@/services/user'
import bus from '@/utils/bus'
interface iData {
  breadList: RouteRecord[]
  isCollapse: boolean
  userInfo: {
    portrait: string
    userName: string
    isUpdatedPassword: boolean
  }
}
export default vue.extend({
  name: 'appHeader',
  components: {},
  props: {},
  data(): iData {
    return {
      breadList: [],
      isCollapse: false,
      userInfo: {
        portrait: '',
        userName: '',
        isUpdatedPassword: true
      }
    }
  },
  created() {
    // this.getBreadList(this.$route)
    // 获取用户信息
    this.loadUserInfo()
    // 获取路由信息并处理
    this.breadList = this.getBreadList(this.$route)
  },
  methods: {
    getBreadList(route: Route): RouteRecord[] {
      return route.matched.map(item => {
        if (item.path === '') {
          item.path = '/'
        }
        return item
      })
    },
    handleClick(flag: boolean) {
      this.isCollapse = flag
      bus.$emit('isCloseChange', flag)
    },
    async loadUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.content
      console.log(data, 'getUserInfo')
    },
    handleLogout() {
      this.$confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await logout()
        if (data.state === 1) {
          this.$store.commit('setUser', null)
          this.$router.push({
            name: 'login'
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        } else {
          this.$message.error(data.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  watch: {
    // 监听地址栏的变化
    $route() {
      this.breadList = this.getBreadList(this.$route)
    }
  }
})
</script>

<style lang="scss" scoped>
.appHeader {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .hamburger {
    margin-right: 10px;
    padding: 15px;
    font-size: 20px;
    border: 0;
    border-radius: 0;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .headerNav {
    display: flex;
    align-items: center;
    // justify-content: space-between

  }
}
</style>
