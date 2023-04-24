<!--
 * @author: SumO
 * @create: 2022-12-06 15:03 PM
 * @license: MIT
 * @lastAuthor: SumO
 * @lastEditTime: 2023-02-08 14:52 PM
 * @desc: 登陆
-->
<template>
  <div class='login'>
    <el-form class='login-form' :rules='rules' ref='form' label-position='top' :model='form' label-width='80px'>
      <el-form-item label='手机号' prop='phone'>
        <el-input v-model='form.phone'></el-input>
      </el-form-item>
      <el-form-item label='密码' prop='password'>
        <el-input v-model='form.password' type='password'></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading='loading' class='login-btn' type='primary' @click='onSubmit'>登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang='ts'>
import vue from 'vue'
import { loginInfo } from '@/services/user'
import { Form } from 'element-ui/types/element-ui'
export default vue.extend({
  data() {
    return {
      name: 'login',
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '请输入正确的密码' }
        ]
      },
      loading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true
        await (this.$refs.form as Form).validate()
        const { data } = await loginInfo(this.form)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          this.$store.commit('setUser', data.content)
          console.log(data)
          this.$router.push((this.$route.query.redirect as string) || '/')
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log(error)
        // this.loading = false
      }
      this.loading = false
    }
  }
})
</script>
<style lang='scss' scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 300px;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
