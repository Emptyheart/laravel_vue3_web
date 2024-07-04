<template>
    <el-descriptions :column="1" border style="max-width: 500px;">
        <el-descriptions-item label="登录邮箱">
            {{ user.email }}
            <el-button link type="primary" @click="dialogVisible = true">修改密码</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ $formatTime(user.created_at) }}</el-descriptions-item>
      <el-descriptions-item label="退出登录"><el-link type="primary" @click="logout">退出登录</el-link></el-descriptions-item>
    </el-descriptions>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {$get} from '@/utils/request'
import {$formatTime} from '@/utils/format'
import {useUserStore} from "@/stores/user.js";

const userStore = useUserStore()
const user = ref({})

onMounted(async () => {
  await loadData()
})

async function loadData() {
  user.value = await $get(`user`)
  console.log(user.value)
}

function logout()
{
  userStore.clearUserToken()
  window.location.href = '/login'
}

const dialogVisible = ref(false)
</script>

<style scoped>

</style>
