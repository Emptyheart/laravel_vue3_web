<template>

  <div style="min-width: 1080px">
    <el-config-provider :locale="zhCn">
      <router-view/>
    </el-config-provider>
  </div>

</template>

<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>




<style lang="less">

// https://github.com/element-plus/element-plus/issues/15510
// select没有默认样式原因
.el-select {
  width: 220px !important;
}

// 所有的必输项改为不带*星号
//.required:before {
//content: '*';
//color: var(--el-color-danger);
//margin-right: 4px;
//}


.el-form-item__label::before {
  content: normal !important;
  margin: 0 !important;
}

div > .number {
  width: 200px;

  :deep(input) {
    text-align: right;
  }
}

.yq-number {
  width: 200px;

  :deep(input) {
    text-align: right;
  }
}

//body {
//background-color: #f0f2f5 !important;
//}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-card__body) {
  overflow-y: auto /* 开启滚动显示溢出内容 */
}

// 修改table header样式
.el-table {
  th {
    background-color: rgba(248, 248, 248) !important;
  }

  .cell:empty::before {
    content: "-";
  }

  .is-leaf {
    .cell:empty::before {
      content: "-";
    }
  }
}

.no-error {
  :deep(.el-form-item__error) {
    display: none;
  }
}

.yq-error {
  color: red;
}

</style>
