<!--
 * @author: SumO
 * @create: 2022-12-13 10:55 AM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-13 15:26 PM
 * @desc: 添加菜单
-->
<template>
  <div class="menu-create">
    <CreateOrEdit></CreateOrEdit>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default vue.extend({
  name: 'menu-create',
  components: {
    CreateOrEdit
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
