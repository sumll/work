<!--
 * @author: SumO
 * @create: 2022-12-07 15:15 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-16 15:39 PM
 * @desc:角色管理
-->
<template>
  <div>
    <roleList></roleList>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import roleList from './components/role-list.vue'
export default vue.extend({
  name: 'role',
  components: {
    roleList
  },
  props: {},
  data() {
    return {
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
