<template>
  <div class="container">

    <!-- 外层box -->
    <el-card class="box-card">
      <div class="title">
        <img src="@/assets/logo.svg" alt="">
        <h2>管理平台</h2>
      </div>

<!--      <PasswordLogin ref="passwordLoginRef" v-show="loginType === 1"/>-->
      <EmailLogin ref="passwordLoginRef" v-show="loginType === 1"/>
      <ChangePassword ref="changePasswordRef" v-show="loginType === 2"/>
      <div class="operation">
<!--        <el-checkbox v-model="formData.remember" label="记住我"  size="small" />-->
        <el-button type="primary" link size="small" :underline="false" @click="toRegister">注册</el-button>
        <el-button type="primary" link size="small" @click="changeLoginType">
          <span v-if="loginType === 1">忘记或设置密码</span>
          <span v-if="loginType === 2">返回登录</span>
        </el-button>
        <el-button type="primary" :loading="submitting" @click="onLogin">登录</el-button>
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
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import {ElLoading, ElMessage} from "element-plus";
import IconWechat from "@/components/icons/IconWechat.vue";
import {$postJson} from "@/utils/request";
import {redirectWxQrconnect} from "@/utils/user";
import EmailLogin from "@/components/EmailLogin.vue";
import PasswordLogin from "@/components/PasswordLogin.vue";
import ChangePassword from "@/components/ChangePassword.vue";
import {Cellphone, Message, Lock} from "@element-plus/icons-vue";

const router = useRouter()
const changePasswordRef = ref()
const passwordLoginRef = ref()
const route = useRoute()
const code = route.query.code
const formData = ref({
  email: '',
  password: '',
  remember: false
})


// 登录类型 1:密码登录 2:修改密码并登录
const loginType = ref(1)
const submitting = ref(false)

function toRegister(){
  router.push("/register")
}

async function onLogin() {

  try {
    submitting.value = true
    const user = await (loginType.value === 1 ? passwordLoginRef : changePasswordRef).value.onLogin()
    useUserStore().setUserToken(user)
    useUserStore().setUser(user)
    ElMessage.success("登录成功")

    // 登录后跳转页面
    await router.push(route.query.to || "/index")
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  if (code) {
    // 进行绑定
    // 移除掉code
    await router.replace()
    const loading = ElLoading.service({
      lock: true,
      text: '微信登录中...',
    })
    try {
      // 微信绑定
      const user = await $postJson("user/wxLogin", {code})
      console.log(user);
      setUserToken(user)
      ElMessage.success("登录成功")
      // 登录后跳转页面
      await router.push(route.query.to || "/user")
    } catch (e) {
      console.error(e)
    } finally {
      loading.close()
    }
  }
})

/**
 * 切换登录状态
 */
function changeLoginType() {
  if (loginType.value === 1) {
    loginType.value = 2
    return
  }
  loginType.value = 1
}

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
    margin: 20vh auto 0;
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
