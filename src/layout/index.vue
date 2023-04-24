<!--
 * @author: SumO
 * @create: 2022-12-06 16:45 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-14 17:41 PM
 * @desc: layout
-->
<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto">
        <!-- 侧边栏 -->
        <appAside></appAside>
      </el-aside>
      <el-container>
        <el-header>
          <appHeader></appHeader>
        </el-header>
        <el-main>
          <!-- 子路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import appAside from './components/app-aside.vue'
import appHeader from './components/app-header.vue'
export default vue.extend({
  name: 'LayoutIndex',
  components: {
    appAside,
    appHeader
  },
  props: {},
  data() {
    return {
    }
  }
})
</script>
<style lang='scss' scoped>
.el-container {
  height: 100vh;
  // min-width: 980px;
  // min-width: 980px;
}
.el-aside {
  background-color: #d3dce6;
}
.el-header {
  background-color: #fff;

}
.el-main {
  background-color: #e9eef3;
}
</style>
