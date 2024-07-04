<template>
  <div class="container">

    <!-- 外层box -->
    <el-card class="box-card">
      <div class="title">
        <img src="@/assets/logo.svg" alt="">
        <h2>注册</h2>
      </div>
      <el-form
          ref="ruleFormRef"
          :rules="rules"
          label-position="top"
          label-width="100px"
          :model="formData"
          style="max-width: 460px"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="formData.name" maxlength="255" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" maxlength="255" :prefix-icon="Message"/>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="formData.password" maxlength="16" type="password" show-password :prefix-icon="Lock"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirmation">
          <el-input v-model="formData.password_confirmation" maxlength="16" type="password" show-password required :prefix-icon="Lock"/>
        </el-form-item>
      </el-form>
      <div class="operation">
        <el-button type="primary" link size="small" @click="toLogin">登录</el-button>
        <el-button type="primary" :loading="submitting" @click="onRegister">注册</el-button>
      </div>

<!--      <div class="login-common" @click="onOpenWxOauth2">-->
<!--        <div class="wechat">-->
<!--          <IconWechat class="icon"/>-->
<!--          <span>微信登录</span>-->
<!--        </div>-->
<!--      </div>-->

    </el-card>
  </div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {ElMessage} from "element-plus";
import IconWechat from "@/components/icons/IconWechat.vue";
import {$postJson} from "@/utils/request";
import {redirectWxQrconnect} from "@/utils/user";
import {Cellphone, Lock, User, Message} from "@element-plus/icons-vue";
import verify from "@/utils/verify.js";

const router = useRouter()
const {setUserToken} = useUserStore()
const route = useRoute()

const submitting = ref(false)

const ruleFormRef = ref()
const confirmPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  }else if (value !== formData.password) {
    callback(new Error('两次输入密码不一致!'))
  }else {
    callback()
  }
}
const rules = reactive({
  name: [
    {required: true, message: '请输入昵称', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入邮箱地址', trigger: 'blur'},
    verify('email')
  ],
  password: [
    {required: true, message: '请输入登录密码', trigger: 'blur'},
    {min: 6, max: 16, message: '登录密码为6-16字符', trigger: 'blur'},
  ],
  password_confirmation: [
    {validator: confirmPassword, trigger: 'blur'}
  ],
})

const formData = reactive({
  phone: '',
  password: '',
  password_confirmation: '',
})

function toLogin(){
  router.push("/login")
}

async function onRegister() {

  try {
    submitting.value = true
    const user = await $postJson("/register", formData)
    setUserToken(user)
    ElMessage.success("登录成功")

    // 登录后跳转页面
    await router.push(route.query.to || "/orders")
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  // if (code) {
  //   // 进行绑定
  //   // 移除掉code
  //   await router.replace()
  //   const loading = ElLoading.service({
  //     lock: true,
  //     text: '微信登录中...',
  //   })
  //   try {
  //     // 微信绑定
  //     const user = await $postJson("user/wxLogin", {code})
  //     setUser(user)
  //     ElMessage.success("登录成功")
  //     // 登录后跳转页面
  //     await router.push(route.query.to || "/orders")
  //   } catch (e) {
  //     console.error(e)
  //   } finally {
  //     loading.close()
  //   }
  // }
})

function onOpenWxOauth2() {
  redirectWxQrconnect()
}

</script>

<style scoped lang="less">


.container {
  background-color: #f0f2f5 !important;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/background.svg");
  overflow: auto;

  .box-card {
    width: 480px;
    padding: 20px;
    margin: 15vh auto 0;
    box-sizing: content-box;
    border-radius: 10px;

    .title {
      display: flex;
      align-items: center;

      img {
        height: 30px;
      }

      h2 {
        margin-left: 20px;
        font-size: 26px;
        font-weight: normal;
        color: #0081ec;
      }
    }

    .operation {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }

    //.login-common {
    //  margin: 20px auto 0;
    //  width: 144px;
    //  height: 40px;
    //  border: 1px solid rgba(0, 0, 0, 0.08);
    //  border-radius: 999px;
    //  color: rgba(51, 51, 51, 0.08);
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
    //  cursor: pointer;
    //
    //  &:hover {
    //    background-color: rgba(0, 0, 0, 0.03);
    //  }
    //
    //  .wechat {
    //    display: flex;
    //    align-items: center;
    //
    //
    //    .icon {
    //      width: 18px;
    //      height: 18px;
    //    }
    //
    //    span {
    //      margin-left: 4px;
    //      font-size: 14px;
    //      color: #333;
    //    }
    //  }
    //}
  }
}
</style>
