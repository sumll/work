<!--
 * @author: SumO
 * @create: 2022-12-07 15:17 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-14 17:15 PM
 * @desc:资源管理
-->
<template>
  <div>
    <resourceList></resourceList>
  </div>
</template>

<script lang='ts'>
import vue from 'vue'
import resourceList from './components/resource-list.vue'
export default vue.extend({
  name: 'resource',
  components: {
    resourceList
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
