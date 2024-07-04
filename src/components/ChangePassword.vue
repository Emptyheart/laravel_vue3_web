<!-- 修改密码 -->

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
      <el-input v-model="formData.phone" maxlength="11" required :prefix-icon="Cellphone"/>
    </el-form-item>
    <el-form-item label="短信验证码" prop="captcha">
      <el-input v-model="formData.captcha" maxlength="6" required :prefix-icon="ChatLineSquare">
        <template #append>
          <el-button @click="getCaptcha" :loading="loading" :disabled="disabled">{{ captchaText }}</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input v-model="formData.password" maxlength="16" type="password" show-password required :prefix-icon="Lock"/>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from "vue";
import {$get, $patchJson, $postJson} from "@/utils/request";
import {ElMessage} from "element-plus";
import {Cellphone, Lock, ChatLineSquare} from "@element-plus/icons-vue";

// 获取验证码状态
const loading = ref(false)

// 验证码按键状态
const disabled = ref(false)

// 验证码文案
const CAPTCHA_TEXT = "获取验证码"
const captchaText = ref(CAPTCHA_TEXT)

const ruleFormRef = ref()
const rules = reactive({
  phone: [
    {required: true, message: '请输入手机号码', trigger: 'blur'},
    {min: 11, max: 11, message: '请输入11位有效手机号码', trigger: 'blur'},
  ],
  captcha: [
    {required: true, message: '请输入验证码', trigger: 'blur'},
    {min: 6, max: 6, message: '请输入6位有效验证码', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入登录密码', trigger: 'blur'},
    {min: 6, max: 16, message: '登录密码为6-16字符', trigger: 'blur'},
  ]
})
const formData = reactive({
  phone: '',
  captcha: '',
  password: ''
})

/**
 * 获取验证码
 */
async function getCaptcha() {

  // 判断手机号码格式正确
  if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
    ElMessage.error("手机号码格式不正确")
    return
  }

  loading.value = true
  try {
    await $get('user/sendCode', {
      phone: formData.phone
    });
    loading.value = false
    disabled.value = true;
    ElMessage.success("发送成功");
    (() => {
      let countdown = 60
      const interval = setInterval(() => {

        captchaText.value = countdown-- + '秒'

        if (countdown <= 0) {
          // 清除
          clearInterval(interval)

          // 可以点击
          disabled.value = false

          // 设置文案
          captchaText.value = CAPTCHA_TEXT
        }

      }, 1000)
    })();

  } finally {
    loading.value = false
  }
}

async function onLogin() {
  return new Promise((resolve, reject) => {
    ruleFormRef.value.validate(async (valid, fields) => {
      if (!valid) {
        reject("参数未校验通过")
        return
      }
      resolve($patchJson("user/password", formData))
    })
  })
}

defineExpose({
  onLogin
})

</script>

<style scoped>

</style>