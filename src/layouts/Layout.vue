<template>
  <el-config-provider :locale="zhCn">
    <el-container style="height: 100vh">
      <el-header
          style="text-align: right; font-size: 12px; background-color: white; box-sizing: border-box; border-bottom: 1px #eee solid">
        <div class="toolbar">
          <div class="left">
            <a href="/">
              <img src="@/assets/logo.svg" alt="logo">
            </a>
          </div>

          <div>
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting/>
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="toUser">我的</el-dropdown-item>
                  <el-dropdown-item @click="onLogout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ user?.name }}【{{ user?.email }}】</span>
          </div>
          <div class="collapse" :style="{left: isCollapse ? '50px': '168px'}">
            <el-icon @click="onCollapse">
              <ArrowRight v-if="isCollapse"/>
              <ArrowLeft v-else/>
            </el-icon>
          </div>

        </div>
      </el-header>

      <el-container style="height: calc(100vh - 60px)">
        <!-- https://blog.csdn.net/Shids_/article/details/112701159 -->
        <el-aside :width="isCollapse ? '85px' : '200px'" class="aside">
          <el-scrollbar>
            <el-menu @select="handleSelect"
                     router
                     active-text-color="black"
                     :default-active="defaultActive"
                     :collapse="isCollapse"
                     @contextmenu.prevent="openLink($event)"
            >
              <el-menu-item-group title="首页"/>
              <el-menu-item index="/index" data-index="/index">
                <el-icon>
                  <IconOrder2 v-if="selectPath === '/index'"/>
                  <IconOrder v-else/>
                </el-icon>
                <span>首页</span>
              </el-menu-item>
              <el-menu-item index="/order" data-index="/order">
                <el-icon>
                  <IconList2 v-if="selectPath === '/order'"/>
                  <IconList v-else/>
                </el-icon>
                <span>订单列表</span>
              </el-menu-item>
              <el-menu-item-group title="其它"/>
              <el-menu-item index="/user" data-index="/user">
                <el-icon>
                  <IconMine2 v-if="selectPath === '/user'"/>
                  <IconMine v-else/>
                </el-icon>
                <span>我的账户</span>
              </el-menu-item>
<!--              <el-menu-item index="/systemMembers" data-index="/systemMembers">-->
<!--                <el-icon>-->
<!--                  <IconUsers2 v-if="selectPath === '/systemMembers'"/>-->
<!--                  <IconUsers v-else/>-->
<!--                </el-icon>-->
<!--                <span>员工管理</span>-->
<!--              </el-menu-item>-->
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-main>
          <el-scrollbar ref="mainScroll">
            <el-breadcrumb :separator-icon="ArrowRight" style="margin-bottom: 20px;">
              <template v-for="breadcrumb in breadcrumbs">
                <el-breadcrumb-item v-if="breadcrumb.path" :to="{ path: breadcrumb.path }">
                  {{ breadcrumb.title }}
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else>{{ breadcrumb.title }}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <router-view/>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>

import {ref, onMounted} from 'vue'
import {ArrowDown, ArrowLeft, ArrowRight, Setting} from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import {useUserStore} from "@/stores/user";
import {useRoute, useRouter} from "vue-router";
import _ from "lodash";
import {useTitle, useToggle} from "@vueuse/core";
import {$get, $put} from "@/utils/request";
import IconInvoice from "@/components/icons/IconInvoice.vue";
import IconList from "@/components/icons/IconList.vue";
import {storeToRefs} from 'pinia';
import {breadcrumbs} from "@/utils/use"

const mainScroll = ref()
const router = useRouter()
const route = useRoute()
const defaultActive = ref()
const {user,clearUser} = useUserStore()
// 是否展开
const collapse = localStorage.getItem("collapse")
const [isCollapse, toggle] = useToggle(collapse === 'true')

const firstPath = route.path.replace(/^\//, '').split('/')[0];
if (!_.isEmpty(firstPath)) {
  defaultActive.value = `/${firstPath}`
}

// 审核数量和情况
const selectPath = ref(defaultActive.value)

async function handleSelect(path) {
  selectPath.value = path
}

function onCollapse() {
  toggle()

  // 持久化数据
  localStorage.setItem("collapse", isCollapse.value)
}

async function onLogout() {
  await $get('/logout')
  clearUser()
  await router.push("/login")
}

onMounted(async () => {
  // 用户信息
  // user.value = useUserStore()
})

async function toUser() {
  await router.push("/user")
}

function openLink($event) {
  $event.preventDefault();
  const link = $event?.target?.offsetParent?.dataset?.index
  if (link) {
    window.open(link, '_blank');
  }
}

</script>

<style scoped lang="less">

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  position: relative;


  .collapse {
    width: 25px;
    height: 25px;
    box-shadow: var(--el-box-shadow-light);
    background-color: white;
    border-radius: 50%;
    position: absolute;
    z-index: 9;
    top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .left {
    img {
      height: 30px;
    }

    span {
      font-size: 12px;
      color: black;
    }

    display: flex;
    align-items: center;
  }
}

</style>

<style lang="less">

.el-menu-item {
  height: 40px;
  width: 168px;

  &:hover {
    background-color: #f8f8f8;
  }

  span {
    color: #656565 !important;
  }
}

.el-menu .is-active {
  background-color: #f8f8f8;

  span {
    color: #1c1c1c !important;
  }
}

.el-tooltip__trigger {
  outline: none;
}

.el-aside {
  border-right: 1px solid #ddd !important;
}

.el-menu, .el-menu-item {
  border-right-width: 0 !important;
  width: 200px;
}

:deep(.collapse-box) {
  position: relative;

  .collapse {
    position: absolute;
  }
}

.aside {
  height: calc(100vh - 60px);

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}

.badge {
  margin-left: 5px;
  background-color: var(--el-color-danger);
  border-radius: 10px;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 0 6px;
  height: 18px;
  white-space: nowrap;
  border: 1px solid white;
}

//body {
//  background-color: #f0f2f5 !important;
//}
</style>
