<!-- 密码登录 -->

<template>
  <el-form
      ref="ruleFormRef"
      :rules="rules"
      label-position="top"
      label-width="100px"
      :model="formData"
      style="max-width: 460px"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="formData.phone" maxlength="11" :prefix-icon="Cellphone"/>
    </el-form-item>
    <el-form-item label="登录密码" prop="password">
      <el-input v-model="formData.password" maxlength="16" type="password" show-password :prefix-icon="Lock"/>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from "vue";
import {$get, $postJson} from "@/utils/request";
import {Cellphone, Lock} from "@element-plus/icons-vue";

const ruleFormRef = ref()
const rules = reactive({
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入11位有效手机号码', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入登录密码', trigger: 'blur'},
    {min: 6, max: 16, message: '登录密码为6-16字符', trigger: 'blur'},
  ]
})

const formData = reactive({
  phone: '',
  password: '',
})

async function onLogin() {
  return new Promise((resolve, reject) => {
    ruleFormRef.value.validate(async (valid, fields) => {
      if (!valid) {
        reject("参数未校验通过")
        return
      }

      resolve($postJson("user/login", formData))
    })
  })
}

defineExpose({
  onLogin
})

</script>

<style scoped>

</style>