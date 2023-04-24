<!--
 * @author: SumO
 * @create: 2022-12-13 10:55 AM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-13 16:13 PM
 * @desc: 添加菜单
-->
<template>
  <div class="menu-create">
    <CreateOrEdit :isEdit="true"></CreateOrEdit>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default vue.extend({
  name: 'menu-edit',
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
