<!--
 * @author: SumO
 * @create: 2022-12-23 16:22 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2022-12-24 14:08 PM
 * @desc: 富文本编译器
-->
<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
      @onCreated="onCreated" />
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
type InsertFnType = (url: string, alt: string, href: string) => void
export default Vue.extend({
  components: { Editor, Toolbar },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      editor: null,
      html: this.value,
      toolbarConfig: {
        excludeKeys: [
          'fullScreen',
          'uploadVideo'
        ]
      },
      editorConfig: {
        placeholder: '请输入课程详情内容内容...',
        MENU_CONF: {
          uploadImage: {
            base64LimitSize: 5 * 1024,
            server: '/boss/course/upload',
            // form-data fieldName ，默认值 'wangeditor-uploaded-image'
            fieldName: 'file',

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 1 * 1024 * 1024, // 1M

            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 5,

            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],

            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            metaWithUrl: false,

            // 自定义增加 http  header
            headers: {
              Accept: 'application/json'
            },

            // 超时时间，默认为 10 秒
            timeout: 5 * 1000, // 5 秒
            customInsert(res: any, insertFn: InsertFnType) { // TS 语法
              // res 即服务端的返回结果
              const { data } = res
              // 从 res 中找到 url alt href ，然后插入图片
              insertFn(data.name, data.uid, data.name)
            }
          }
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated(editor: any) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },
  watch: {
    value(newVal) {
      // this.$emit('input', this.value)
      this.html = newVal
    },
    html(newVal) {
      this.$emit('input', newVal)
    }
  },
  beforeDestroy() {
    const editor = this.editor as any
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>
<style lang="scss">

</style>
