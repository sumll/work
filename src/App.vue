<!--
 * @author: SumO
 * @create: 2022-12-02 14:12 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-13 11:11 AM
 * @desc:
-->
<template>
  <div id='app'>
    <!-- 根路由出口 -->
    <router-view />
  </div>
</template>
<script lang='ts'>
import vue from 'vue'

export default vue.extend({
  data() {
    return {
    }
  }
})
</script>
<style lang='scss' scoped>
// @import "~@/styles/variables.scss";
</style>
