<!-- 邮箱密码登录 -->

<template>
  <el-form
      ref="ruleFormRef"
      :rules="rules"
      label-position="top"
      label-width="100px"
      :model="formData"
      style="max-width: 460px"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" :prefix-icon="Message"/>
    </el-form-item>
    <el-form-item label="登录密码" prop="password">
      <el-input v-model="formData.password" maxlength="16" type="password" show-password :prefix-icon="Lock"/>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from "vue";
import {$postJson} from "@/utils/request";
import {Message, Lock} from "@element-plus/icons-vue";
import verify from "@/utils/verify.js";

const ruleFormRef = ref()
const rules = reactive({
  email: [
    {required: true, message: '请输入邮箱', trigger: 'blur'},
    verify('email')
  ],
  password: [
    {required: true, message: '请输入登录密码', trigger: 'blur'},
    {min: 6, max: 16, message: '登录密码为6-16字符', trigger: 'blur'},
  ]
})

const formData = reactive({
  email: '',
  password: '',
})

async function onLogin() {
  return new Promise((resolve, reject) => {
    ruleFormRef.value.validate(async (valid, fields) => {
      if (!valid) {
        reject("参数未校验通过")
        return
      }

      resolve($postJson("/login", formData))
    })
  })
}

defineExpose({
  onLogin
})

</script>

<style scoped>

</style>
